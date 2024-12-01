/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import { FavoriteFullIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"
import { RevalidateURL } from "@/app/utils/serveractions"
import { AddRemoveFavorite, GetStates } from "@/app/services/fetchData"
import { enqueueSnackbar } from "notistack"
import { IAccountStates, } from "@/app/interfaces/movie"
import { useSession } from "@/app/hooks/useSession"
import { useEffect, useState } from "react"

interface Props {
    id: number
    title: string
    type: 'movie' | 'tv'
    isFavorites?: boolean
}

export function FavoriteButton({ id, title, type, isFavorites }: Props) {
    const { session_id } = useSession()
    const [isFavorite, setIsFavorite] = useState(isFavorites || false)

    useEffect(() => {

        const GetData = async () => {
            let stateData: IAccountStates | null
            if (type === "movie") {
                stateData = await GetStates(session_id, id, type)
            } else {
                stateData = await GetStates(session_id, id, type)
            }
            setIsFavorite(stateData?.favorite || false)
        }
        if (session_id)
            GetData()
    }, [session_id])

    const HandleAddRemoveFavorite = async () => {
        const AddFavorite = async () => {
            const response = await AddRemoveFavorite(session_id, type, id, !isFavorite)
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
            setIsFavorite(prev => !prev)
        }
        AddFavorite()
    }

    return (
        <button className={styles.fav} onClick={HandleAddRemoveFavorite} title={!isFavorite ? "Agregar a favoritos" : "Eliminar de favoritos"}><FavoriteFullIcon className={`${styles.favIcon} ${isFavorite && styles.favActive}`} /> </button>
    )
}