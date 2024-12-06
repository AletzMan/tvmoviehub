"use client"
import styles from "./styles.module.scss"
import Link from "next/link"
import Image from "next/image"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { DeleteIcon, DetailsIcon, LoadingIcon, MovieIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import { IPartCollection } from "@/app/interfaces/movie"
import { useState } from "react"
import { FavoriteButton } from "../FavoriteButton/FavoriteButton"
import { useDialogAlert, useLoadingState } from "@/app/services/store"
import { IListItem } from "@/app/interfaces/list"

interface Props {
    movie: IListItem
    list_id: number
}

export function MovieCardList({ movie, list_id }: Props) {
    const [load, setLoad] = useState(true)
    const { setLoadingState } = useLoadingState()
    const { viewDialog, setViewDialog, setItemToDelete, setTypeDialog } = useDialogAlert()

    const HandleLoadImage = () => {
        setLoad(false)
    }

    const HandleDeleteItem = async () => {
        setViewDialog(true)
        setTypeDialog("item")
        setItemToDelete({ id: movie.id, list_id, name_item: movie.name || movie.title, name_list: "", text: ["¿Desea eliminar el elemento de la lista?", ""] })
    }

    return (
        <div key={movie.id} className={styles.movie}>
            <div className={styles.movie_picture}>
                {movie.poster_path
                    ?
                    <Image className={styles.movie_photo} onLoad={HandleLoadImage} src={movie.poster_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(movie.poster_path) || '') : "/not_photo.png"} width={202} height={210} alt={`Poster de ${movie.title}`} />
                    :
                    <Image className={styles.movie_photo} onLoad={HandleLoadImage} src={"/not_photo.png"} width={202} height={210} alt={`Poster de ${movie.title}`} />
                }
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/lists/details/${movie.id}`} title={movie.title} onClick={() => setLoadingState(true)}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie?.vote_average?.toFixed(1)}</span>
            <button className={styles.delete} title="Eliminar película de la lista" onClick={HandleDeleteItem}>
                <DeleteIcon className={styles.delete_icon} />
            </button>
            <div className={styles.movie_description}>
                {movie.media_type && movie.media_type === "movie" && <span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>}
                {movie.media_type && movie.media_type === "tv" && <span className={styles.movie_type}><SerieIcon className={styles.movie_typeIcon} />Serie</span>}
                <span className={styles.movie_name}>{movie.title || movie.name}</span>
                <span className={styles.movie_age}>{(movie?.release_date || movie?.first_air_date) ? new Date(movie?.release_date || movie?.first_air_date || "")?.toISOString().split("-")[0] : "N/A"}</span>
            </div>
            {load && <LoadingIcon className={styles.loading} />}
        </div>
    )
}