/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { AddIcon, BookmarkIcon, BuenaIcon, CloseIcon, EspectacularIcon, ExcelenteIcon, FantasticaIcon, FavoriteFullIcon, IncreibleIcon, LegendariaIcon, ListIcon, MalaIcon, MuyBuenaIcon, OptionsIcon, RegularIcon, StarIcon, TerribleIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"
import { useState, MouseEvent, KeyboardEvent, useRef, useEffect, useCallback, Dispatch, SetStateAction, SyntheticEvent, ChangeEvent } from "react"
import { useSession } from "@/app/hooks/useSession"
import { IAccountStates } from "@/app/interfaces/movie"
import { AddItemToList, AddRating, AddRemoveFavorite, AddToWatchList, CheckItemStatus, DeleteRating, GetLists, GetStates } from "@/app/services/fetchData"
import { RevalidateURL } from "@/app/utils/serveractions"
import { enqueueSnackbar, } from "notistack"
import { Button } from "../Button/Button"
import { IListMovie, IResponseListMovie } from "@/app/interfaces/list"

import { FormAddMovie } from "@/app/lists/components/FormAddMovie"

import { createPortal } from "react-dom"
import { ComboBox } from "../ComboBox/ComboBox"

interface Props {
    id: number
    type: 'movie' | 'tv'
    title: string
}


function MediaOptionsContent({ id, type, title }: Props) {
    const { session_id } = useSession()
    const activatorRef = useRef<HTMLElement | null>(null)
    const dropdownListRef = useRef<HTMLUListElement | null>(null)
    const [accountState, setAccountState] = useState<IAccountStates | null>(null)
    const [lists, setLists] = useState<IResponseListMovie | null>(null)
    const [currentRated, setCurrentRated] = useState(0)
    const [viewRating, setViewRating] = useState(false)
    const [viewLists, setViewLists] = useState(false)
    const [viewCreateList, setViewCreateList] = useState(false)
    const [selectedList, setSelectedList] = useState<string>("")
    const [viewMenu, setViewMenu] = useState(false)

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const GetData = useCallback(async (newValue?: number) => {
        const stateData = await GetStates(session_id, id, type)
        setAccountState(stateData)
        setCurrentRated(newValue || (stateData?.rated.value || NaN))
    }, [session_id, id, type])

    useEffect(() => {
        if (session_id && viewMenu)
            GetData()
    }, [session_id, viewMenu, GetData])

    function HandleViewMenu(event: MouseEvent<HTMLButtonElement>): void {
        setViewMenu(prev => !prev)
        setViewLists(false)
    }

    const keyHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.key === "Escape" && viewMenu) {
            setViewMenu(false)
        }
    }

    const clickOutsideHandler = useCallback((event: any) => {
        if (dropdownListRef?.current) {
            if (
                dropdownListRef.current.contains(event.target) ||
                activatorRef?.current?.contains(event.target)
            ) {
                return
            }
            setViewMenu(false)
        }
    }, [])

    useEffect(() => {
        if (viewMenu && dropdownListRef.current) {
            dropdownListRef!.current!.querySelector("button")?.focus()
            document.addEventListener("mousedown", clickOutsideHandler)
        }

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [viewMenu, clickOutsideHandler])

    const HandleAddRemoveFavorite = async () => {
        const AddFavorite = async () => {
            const response = await AddRemoveFavorite(session_id, type, id, !accountState?.favorite)
            if (response.success) {
                if (type === "movie") {
                    RevalidateURL("favoriteMovies")
                } else {
                    RevalidateURL("favoriteSeries")
                }
                if (response.status_code === 1) {
                    enqueueSnackbar(`${type === "movie" ? "Película" : "Serie"} '${title}' agregada a favoritos.`, { variant: "success" })
                } else if (response.status_code === 13) {
                    enqueueSnackbar(`${type === "movie" ? "Película" : "Serie"} '${title}' eliminada de favoritos.`, { variant: "success" })
                }
            }
            if (accountState)
                setAccountState({ ...accountState, favorite: !accountState.favorite })
        }
        AddFavorite()
    }
    function HandleOverRated(event: MouseEvent<HTMLButtonElement>): void {
        const value = event.currentTarget.value
        setCurrentRated(parseInt(value))
    }

    function HandleLeaveRated(event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void {
        setCurrentRated(accountState?.rated.value || NaN)
    }

    const HandleAddRating = async (event: MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.value
        console.log(value)

        const response = await AddRating(session_id, id, parseInt(value), type)
        console.log(response)
        if (response?.status_code === 1) {
            setCurrentRated(parseInt(value))
            if (accountState)
                setAccountState({ ...accountState, rated: { value: parseInt(value) } })
            enqueueSnackbar(`Has calificado "${title}" con "${parseInt(value)}". ¡Gracias por compartir tu opinión!`, { variant: "success" })
        } else if (response?.status_code === 12) {
            setCurrentRated(parseInt(value))
            if (accountState)
                setAccountState({ ...accountState, rated: { value: parseInt(value) } })
            enqueueSnackbar(`Has cambiado tu calificación de "${title}" a "${parseInt(value)}".`, { variant: "success" })
        } else {
            enqueueSnackbar(`No pudimos procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'`, { variant: "error" })
        }
    }

    const HandleDeleteRating = async (event: MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.value
        const response = await DeleteRating(session_id, id, type)
        if (response?.status_code === 13) {
            setCurrentRated(parseInt(value))
            if (accountState)
                setAccountState({ ...accountState, rated: { value: parseInt(value) } })
            enqueueSnackbar(`¡Calificación eliminada! `, { variant: "success" })
        } else {
            enqueueSnackbar(`No pudimos procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'`, { variant: "error" })
        }

    }

    const HandleViewRating = () => {
        setViewRating(prev => !prev)
    }

    const HandleAddWatchList = async () => {
        const response = await AddToWatchList(session_id, type, id, !accountState?.watchlist)
        if (response?.status_code === 1) {
            GetData()
            enqueueSnackbar(`¡${title} agregada a lista de seguimiento! `, { variant: "success" })
        } else if (response?.status_code === 13) {
            GetData()
            enqueueSnackbar(`¡${title} eliminada de la lista de seguimiento! `, { variant: "success" })
        } else {
            enqueueSnackbar(`No pudimos procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.'`, { variant: "error" })
        }
        await RevalidateURL("watchList")
    }

    const HandleViewMenuList = async () => {
        const currentSearchParams = new URLSearchParams(window.location.search)
        const paramsObj = Object.fromEntries(currentSearchParams.entries())
        const response = await GetLists(session_id, paramsObj)
        setLists(response)
        setViewLists(true)
        setViewMenu(false)
    }

    const HandleMouseOver = () => {
        setViewRating(false)
        setViewLists(false)
    }


    const HandleSelectList = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value
        setSelectedList(value)
    }

    const HandleAddToList = async () => {
        if (!selectedList) {
            enqueueSnackbar(`Por favor selecciona una lista.`, { variant: "error" })
            return
        }
        const status = await CheckItemStatus(selectedList, id)
        console.log("STATUS ADD LIST RESPONSE", status)
        if (!status?.item_present) {
            const response = await AddItemToList(session_id, selectedList, id)
            if (response?.status_code === 12) {
                await RevalidateURL("lists")
                await RevalidateURL("listMovies")
                const listName = lists?.results.find(l => l.id === parseInt(selectedList))?.name
                enqueueSnackbar(`¡${title} se ha agregado a lista ${listName}! `, { variant: "success" })
                setViewLists(false)
                setSelectedList("")
            } else if (response?.status_code === 8) {
                enqueueSnackbar(`El elemento ya había sido añadido previamente.`, { variant: "error" })
                setSelectedList("")
            }
        } else {
            enqueueSnackbar(`El elemento ya había sido añadido previamente.`, { variant: "error" })
            setSelectedList("")
        }
    }

    const HandleCreateListSuccess = () => {
        setViewCreateList(false)
        HandleViewMenuList()
    }

    return (
        <div className={`${styles.options} `} onKeyUp={keyHandler}>
            <button className={styles.options_button} onClick={HandleViewMenu}  ><OptionsIcon /></button>
            {viewMenu &&
                <ul className={`${styles.menu} ${viewMenu ? styles.menu_open : styles.menu_close}`} ref={dropdownListRef} >
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option} `} onClick={HandleViewMenuList}><ListIcon className={styles.menu_icon} />Añadir a lista</button>
                    </li>
                    <hr className={styles.menu_separator} />
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option}  `} onClick={HandleAddRemoveFavorite}><FavoriteFullIcon className={`${styles.menu_icon} ${accountState?.favorite ? styles.favorite : ""}`} />Favorito</button>
                    </li>
                    <hr className={styles.menu_separator} />
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option}  `} onClick={HandleAddWatchList}><BookmarkIcon className={`${styles.menu_icon} ${accountState?.watchlist ? styles.watchlist : ""}`} />Lista de seguimiento</button>
                    </li>
                    <hr className={styles.menu_separator} />
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option} `} onClick={HandleViewRating} >
                            <StarIcon className={`${styles.menu_icon}  ${accountState?.rated.value ? styles.rating : ""}`} /> Tu puntuación
                        </button>
                    </li>
                </ul>
            }
            {mounted && viewRating && createPortal(
                <dialog className={styles.rating_dialog} open onMouseDown={(e) => e.stopPropagation()}>
                    <div className={styles.rating_content}>
                        <Button icon={<CloseIcon />} text="" mode="button" color="danger" className={styles.rating_close} onClick={HandleViewRating} />

                        <span>Calificar: </span>
                        <h3 className={styles.rating_title}>"{title}"</h3>
                        <div className={styles.rating_emojis}>
                            <button className={`${styles.rating_emoji} ${currentRated === 1 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={1} data-tooltip="Terrible"><TerribleIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 2 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={2} data-tooltip="Mala"><MalaIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 3 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={3} data-tooltip="Regular"><RegularIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 4 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={4} data-tooltip="Buena"><BuenaIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 5 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={5} data-tooltip="Muy buena"><MuyBuenaIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 6 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={6} data-tooltip="Excelente"><ExcelenteIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 7 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={7} data-tooltip="Increíble"><IncreibleIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 8 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={8} data-tooltip="Fantástica"><FantasticaIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 9 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={9} data-tooltip="Espectacular"><EspectacularIcon /></button>
                            <button className={`${styles.rating_emoji} ${currentRated === 10 ? styles.rating_emojiActive : ""}`} onClick={HandleAddRating} value={10} data-tooltip="Legendaria"><LegendariaIcon /></button>
                        </div>
                        <div className={styles.rating_actions}>
                            {accountState?.rated.value ?
                                <Button className={styles.rating_delete} mode="button" text="Eliminar puntuación" onClick={HandleDeleteRating} />
                                : null
                            }
                        </div>
                    </div>
                </dialog>,
                document.getElementById('rating-portal')!
            )}
            {mounted && viewLists && createPortal(
                <dialog className={styles.rating_dialog} open onMouseDown={(e) => e.stopPropagation()}>
                    <div className={styles.rating_list}>
                        <Button icon={<CloseIcon />} text="" mode="button" color="danger" className={styles.rating_close} onClick={() => { setViewLists(false); setViewCreateList(false); setSelectedList("") }} />
                        <span>Añadir a lista: </span>
                        <h3 className={styles.rating_title}>"{title}"</h3>
                        <div className={styles.rating_items}>
                            {!viewCreateList ? (
                                <>
                                    <div className={styles.lists}>
                                        <label className={styles.lists_label}>
                                            Añadir a:</label>
                                        <div className={styles.lists_buttons}>
                                            <ComboBox
                                                properties={lists?.results.map(list => ({ option: list.name, value: list.id.toString() })) || []}
                                                onChange={HandleSelectList}
                                                defaultValue={selectedList}
                                                label=""
                                            />

                                            <Button
                                                mode="button"
                                                text="Añadir"
                                                onClick={HandleAddToList}
                                            />
                                        </div>
                                        <Button mode="button" variant="text" text="Crear nueva lista" icon={<AddIcon />} onClick={() => setViewCreateList(true)} />
                                    </div>
                                </>
                            ) : (
                                <div className={styles.create_list_form}>
                                    <FormAddMovie onSuccess={HandleCreateListSuccess} onCancel={() => setViewCreateList(false)} />
                                </div>
                            )}
                        </div>
                    </div>
                </dialog>,
                document.getElementById('rating-portal')!
            )}
        </div>
    )
}

export function MediaOptions(props: Props) {
    return <MediaOptionsContent {...props} />
}
