"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "./moviecard.module.scss"
import { DetailsIcon, FavoriteFullIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { IMovie } from "@/app/interfaces/movie"
import { FormattedDateUpcoming } from "@/app/utils/helpers"
import { FavoriteButton } from "../FavoriteButton/FavoriteButton"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useState } from "react"

interface Props {
    movie: IMovie
}

export const MovieCardUpcoming = ({ movie }: Props) => {
    const { setLoadingState } = useLoadingState()
    const [viewMenu, setViewMenu] = useState(false)
    return (
        <div key={movie.id} className={styles.movie}>
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path || '') : "/not_photo.png"} width={195} height={245} alt={`Poster de ${movie.title}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/movies/${movie.id}`} title={movie.title} onClick={() => setLoadingState(true)}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            <MediaOptions id={movie.id} viewMenu={viewMenu} setViewMenu={setViewMenu} title={movie.title} type="movie" />
            <div className={styles.movie_description}>
                <span className={styles.movie_name}>{movie.title}</span>
                <span className={styles.movie_age}>{FormattedDateUpcoming(movie.release_date)}</span>
            </div>
        </div>
    )
}