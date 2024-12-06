/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { AddIcon, BookmarkIcon, FavoriteFullIcon, ListIcon, OptionsIcon, StarIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"
import { useState, MouseEvent, KeyboardEvent, useRef, useEffect, Dispatch, SetStateAction, SyntheticEvent, ChangeEvent } from "react"
import { useSession } from "@/app/hooks/useSession"
import { IAccountStates } from "@/app/interfaces/movie"
import { AddItemToList, AddRating, AddRemoveFavorite, AddToWatchList, CheckItemStatus, DeleteRating, GetLists, GetStates } from "@/app/services/fetchData"
import { RevalidateURL } from "@/app/utils/serveractions"
import { enqueueSnackbar, } from "notistack"
import { Button } from "../Button/Button"
import { IListMovie, IResponseListMovie } from "@/app/interfaces/list"
import { useSearchParams } from "next/navigation"
import { FormAddMovie } from "@/app/lists/components/FormAddMovie"
import Link from "next/link"

interface Props {
    id: number
    type: 'movie' | 'tv'
    title: string
    viewMenu: boolean
    setViewMenu: Dispatch<SetStateAction<boolean>>
}


export function MediaOptions({ id, type, title, viewMenu, setViewMenu }: Props) {
    const { session_id } = useSession()
    const activatorRef = useRef<HTMLElement | null>(null)
    const dropdownListRef = useRef<HTMLUListElement | null>(null)
    const [accountState, setAccountState] = useState<IAccountStates | null>(null)
    const [lists, setLists] = useState<IResponseListMovie | null>(null)
    const [currentRated, setCurrentRated] = useState(0)
    const [viewRating, setViewRating] = useState(false)
    const [viewLists, setViewLists] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (session_id && viewMenu)
            GetData()
    }, [session_id, viewMenu])

    useEffect(() => {
        if (viewMenu && dropdownListRef.current) {
            dropdownListRef!.current!.querySelector("button")?.focus()
            document.addEventListener("mousedown", clickOutsideHandler)
        } else {
            document.addEventListener("mousedown", clickOutsideHandler)
        }


    }, [viewMenu])

    const GetData = async (newValue?: number) => {
        const stateData = await GetStates(session_id, id, type)
        setAccountState(stateData)
        setCurrentRated(newValue || (stateData?.rated.value || NaN))
    }

    function HandleViewMenu(event: MouseEvent<HTMLButtonElement>): void {
        setViewMenu(prev => !prev)
        setViewLists(false)
    }

    const keyHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape" && viewMenu) {
            setViewMenu(false)
        }
    }

    const clickOutsideHandler = (event: any) => {
        if (dropdownListRef?.current) {
            if (
                dropdownListRef.current.contains(event.target) ||
                activatorRef?.current?.contains(event.target)
            ) {
                return
            }
            setViewMenu(false)
        }
    }

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
        const response = await AddRating(session_id, id, currentRated, type)
        if (response?.status_code === 1) {
            setCurrentRated(parseInt(value))
            if (accountState)
                setAccountState({ ...accountState, rated: { value: parseInt(value) } })
            enqueueSnackbar(`Has calificado "${title}" con "${currentRated}". ¡Gracias por compartir tu opinión!`, { variant: "success" })
        } else if (response?.status_code === 12) {
            setCurrentRated(parseInt(value))
            if (accountState)
                setAccountState({ ...accountState, rated: { value: parseInt(value) } })
            enqueueSnackbar(`Has cambiado tu calificación de "${title}" a "${currentRated}".`, { variant: "success" })
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
        const response = await GetLists(session_id, searchParams)
        setLists(response)
        setViewLists(true)
    }

    const HandleMouseOver = () => {
        setViewRating(false)
        setViewLists(false)
    }


    const HandleSelectList = async (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        const status = await CheckItemStatus(value, id)
        if (!status?.item_present) {
            const response = await AddItemToList(session_id, value, id)
            console.log(response)
            if (response?.status_code === 12) {
                await RevalidateURL("lists")
                await RevalidateURL("listMovies")
                console.log(response?.status_code)
                enqueueSnackbar(`¡${title} se ha agregado a lista ${name}! `, { variant: "success" })
            } else if (response?.status_code === 8) {
                enqueueSnackbar(`El elemento ya había sido añadido previamente.`, { variant: "error" })
                console.log(response?.status_code)
            }
        } else {
            console.log(status)
            enqueueSnackbar(`El elemento ya había sido añadido previamente.`, { variant: "error" })
        }
    }

    return (
        <div className={`${styles.options} `} onKeyUp={keyHandler}>
            <button className={styles.options_button} onClick={HandleViewMenu}  ><OptionsIcon /></button>
            {viewMenu &&
                <ul className={`${styles.menu} ${viewMenu ? styles.menu_open : styles.menu_close}`} ref={dropdownListRef} >
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option} `} onClick={HandleViewMenuList} onMouseOver={HandleMouseOver}><ListIcon className={styles.menu_icon} />Añadir a lista</button>
                        {viewLists &&
                            <div className={styles.list} onMouseLeave={() => setViewLists(false)} >
                                <Link className={styles.list_add} href="/lists/new" ><AddIcon />Crear nueva lista</Link>
                                <div className={styles.lists}>
                                    <label className={styles.lists_label}>
                                        Añadir a:</label>
                                    <select className={styles.lists_select} onChange={HandleSelectList} >
                                        <option className={styles.lists_optionDefault}>Seleccione una lista</option>
                                        {lists?.results.map((list, index) => (
                                            <option key={list.id} className={styles.lists_option} value={list.id}>{list.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        }
                    </li>
                    <hr className={styles.menu_separator} />
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option}  `} onClick={HandleAddRemoveFavorite} onMouseOver={() => setViewRating(false)}><FavoriteFullIcon className={`${styles.menu_icon} ${accountState?.favorite ? styles.favorite : ""}`} />Favorito</button>
                    </li>
                    <hr className={styles.menu_separator} />
                    <li className={styles.options_li}>
                        <button className={`${styles.menu_option}  `} onClick={HandleAddWatchList} onMouseOver={() => setViewRating(false)}><BookmarkIcon className={`${styles.menu_icon} ${accountState?.watchlist ? styles.watchlist : ""}`} />Lista de seguimiento</button>
                    </li>
                    <hr className={styles.menu_separator} />
                    <li className={`${styles.options_li} ${styles.rated}`}>
                        <button className={`${styles.menu_option} `} onClick={HandleViewRating} >
                            <StarIcon className={`${styles.menu_icon}  ${accountState?.rated.value ? styles.rating : ""}`} /> Tu puntuación
                        </button>
                        {viewRating &&
                            <div className={styles.rated_rating} onMouseLeave={HandleViewRating} >
                                <div className={styles.rated_stars} role="button" onMouseLeave={HandleLeaveRated}>
                                    <button className={`${styles.rated_star} ${currentRated >= 1 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={1} attr-tag="Terrible">1</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 2 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={2} attr-tag="Olvidable">2</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 3 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={3} attr-tag="Insípida">3</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 4 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={4} attr-tag="Tolerable">4</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 5 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={5} attr-tag="Decente">5</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 6 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={6} attr-tag="Satisfactoria">6</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 7 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={7} attr-tag="Recomendable">7</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 8 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={8} attr-tag="Brillante">8</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 9 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={9} attr-tag="Espectacular">9</button>
                                    <button className={`${styles.rated_star} ${currentRated >= 10 ? styles.rated_starActive : ""}`} onClick={HandleAddRating} onMouseOver={HandleOverRated} value={10} attr-tag="Legendaria">10</button>
                                    <div className={styles.rated_color}></div>
                                </div>
                                <Button className={styles.rated_delete} mode="button" text="Eliminar mi puntuación" onClick={HandleDeleteRating} />
                            </div>
                        }
                    </li>
                </ul>
            }
        </div>
    )
}
