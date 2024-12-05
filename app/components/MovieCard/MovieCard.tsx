"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "./moviecard.module.scss"
import { DetailsIcon, StarIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { IMovie } from "@/app/interfaces/movie"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useState } from "react"

interface Props {
    movie: IMovie
    top: number
}

export const MovieCard = ({ movie, top }: Props) => {
    const { setLoadingState } = useLoadingState()
    const [viewMenu, setViewMenu] = useState(false)
    return (
        <div key={movie.id} className={styles.movie}>
            <div className={styles.movie_frame}></div>
            <MediaOptions id={movie.id} type="movie" title={movie.title} viewMenu={viewMenu} setViewMenu={setViewMenu} />
            <Image className={styles.movie_backdrop} src={movie.poster_path ? BASE_URL_IMG.concat(movie.backdrop_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${movie.title}`} />
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(movie.poster_path)) : "/not_photo.png"} width={160} height={230} alt={`Poster de ${movie.title}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={`${styles.movie_shadowTop} ${viewMenu ? styles.movie_shadowBlur : ""}`}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/movies/${movie.id}`} title={movie.title} onClick={() => setLoadingState(true)}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            {<span className={styles.movie_number}>{top}</span>}
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie.vote_average.toFixed(1)}</span>
            <div className={styles.movie_description}>
                <span className={styles.movie_name}>{movie.title}</span>
                <span className={styles.movie_age}>{new Date(movie.release_date).getFullYear()}</span>
            </div>
        </div>
    )
}