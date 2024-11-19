/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import { FavoriteFullIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"
import { RevalidateURL } from "@/app/utils/serveractions"
import { AddRemoveFavorite, GetStatesMovie, GetStatesSerie } from "@/app/services/fetchData"
import { enqueueSnackbar } from "notistack"
import { IMovieStates } from "@/app/interfaces/movie"
import { useSession } from "@/app/hooks/useSession"
import { useEffect, useState } from "react"
import { ISerieStates } from "@/app/interfaces/serie"

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
            let stateData: IMovieStates | ISerieStates | null
            if (type === "movie") {
                stateData = await GetStatesMovie(session_id, id)
            } else {
                stateData = await GetStatesSerie(session_id, id)
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