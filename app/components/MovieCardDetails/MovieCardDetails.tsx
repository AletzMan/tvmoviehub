"use client"
import styles from "./moviecarddetails.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/svg"
import { IPartCollection } from "@/app/interfaces/movie"
import { useState, useRef, PointerEvent } from "react"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"

interface Props {
    movie: IPartCollection
    type: 'movie' | 'tv'
    isFavorites?: boolean
}

export function MovieCardDetails({ movie, type, isFavorites }: Props) {
    const router = useRouter()
    const { setLoadingState } = useLoadingState()
    const [viewMenu, setViewMenu] = useState(false)
    const [load, setLoad] = useState(true)

    // Referencias para detectar si el usuario arrastró el slider
    const pointerPos = useRef({ x: 0, y: 0 })
    const isDraggingRef = useRef(false)

    const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
        pointerPos.current = { x: e.clientX, y: e.clientY }
        isDraggingRef.current = false
    }

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const dx = Math.abs(e.clientX - pointerPos.current.x)
        const dy = Math.abs(e.clientY - pointerPos.current.y)

        if (dx > 5 || dy > 5) {
            isDraggingRef.current = true
        }
    }

    const handleCardClick = () => {
        if (isDraggingRef.current) return

        setLoadingState(true)
        router.push(type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`)
    }

    const handleLoadImage = () => {
        setLoad(false)
    }

    return (
        <div
            className={styles.movie}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleCardClick}
        >
            <div className={styles.movie_posterWrapper}>
                <Image
                    className={styles.movie_poster}
                    onLoad={handleLoadImage}
                    src={movie.poster_path ? BASE_URL_IMG.concat(`${movie.poster_path}`) : URL_IMAGE_NOTCOVER}
                    width={200}
                    height={300}
                    alt={`Poster de ${movie.title || movie.name}`}
                    draggable={false}
                />
                <div className={styles.movie_overlay}></div>
            </div>

            <div className={styles.movie_footer}>
                <div>
                    <h4 className={styles.movie_title} title={movie.title || movie.name}>{movie.title || movie.name}</h4>
                    <div className={styles.movie_meta}>
                        <span className={styles.movie_year}>
                            {(movie?.release_date || movie?.first_air_date) ? new Date(movie?.release_date || movie?.first_air_date || "").getFullYear() : "N/A"}
                        </span>
                        <div className={styles.movie_average}>
                            <StarIcon className={styles.movie_icon} />
                            <span>{movie?.vote_average?.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.movie_optionsContainer}
                >
                    <MediaOptions id={movie.id} type={type} title={movie.name || movie.title || ""} viewMenu={viewMenu} setViewMenu={setViewMenu} />
                </div>
            </div>
        </div>
    )
}