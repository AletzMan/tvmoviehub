"use client"
import styles from "./moviecarddetails.module.scss"
import Link from "next/link"
import Image from "next/image"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { DetailsIcon, FavoriteFullIcon, LoadingIcon, MovieIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import { IPartCollection } from "@/app/interfaces/movie"
import { useState } from "react"
import { AddRemoveFavorite } from "@/app/services/fetchData"
import { useSession } from "@/app/hooks/useSession"
import { RevalidateURL } from "@/app/utils/serveractions"
import { useSnackbar } from "notistack"

interface Props {
    movie: IPartCollection
    type: 'movie' | 'tv'
    isFavorites?: boolean
}

export function MovieCardDetails({ movie, type, isFavorites }: Props) {
    const { enqueueSnackbar } = useSnackbar()
    const { session_id } = useSession()
    const [load, setLoad] = useState(true)
    const [isFavorite, setIsFavorite] = useState(isFavorites || false)

    const HandleLoadImage = () => {
        setLoad(false)
    }

    const HandleAddRemoveFavorite = async () => {
        const AddFavorite = async () => {
            const response = await AddRemoveFavorite(session_id, type, movie.id, !isFavorite)
            console.log(response)
            if (response.success) {
                if (type === "movie") {
                    RevalidateURL("favoriteMovies")
                } else {
                    RevalidateURL("favoriteSeries")
                }
                if (response.status_code === 1) {
                    enqueueSnackbar(`${type === "movie" ? "Película" : "Serie"} '${movie.title || movie.name}' agregada a favoritos.`, { variant: "success" })
                } else if (response.status_code === 13) {
                    enqueueSnackbar(`${type === "movie" ? "Película" : "Serie"} '${movie.title || movie.name}' eliminada de favoritos.`, { variant: "success" })
                }
                console.log(response.status_message)
            }
            setIsFavorite(prev => !prev)
        }
        AddFavorite()
    }

    return (
        <div key={movie.id} className={styles.movie}>
            <div className={styles.movie_picture}>
                {movie.poster_path
                    ?
                    <Image className={styles.movie_photo} onLoad={HandleLoadImage} src={movie.poster_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(movie.poster_path) || '') : "/not_photo.png"} width={180} height={210} alt={`Poster de ${movie.title}`} />
                    :
                    <Image className={styles.movie_photo} onLoad={HandleLoadImage} src={"/not_photo.png"} width={180} height={210} alt={`Poster de ${movie.title}`} />
                }
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`} title={movie.title}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie?.vote_average?.toFixed(1)}</span>
            <button className={styles.movie_fav} onClick={HandleAddRemoveFavorite}><FavoriteFullIcon className={`${styles.movie_favIcon} ${isFavorite && styles.movie_favActive}`} /> </button>
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