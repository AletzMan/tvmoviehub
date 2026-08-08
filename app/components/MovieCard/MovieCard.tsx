"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import styles from "./moviecard.module.scss"
import { StarIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { IMovie } from "@/app/interfaces/movie"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useState, useRef, PointerEvent } from "react"

interface Props {
    movie: IMovie
    top?: number
}

export const MovieCard = ({ movie, top }: Props) => {
    const router = useRouter()
    const { setLoadingState } = useLoadingState()
    const [viewMenu, setViewMenu] = useState(false)

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

        // Si se desplaza más de 5 píxeles, se considera un gesto de arrastre/swipe
        if (dx > 5 || dy > 5) {
            isDraggingRef.current = true
        }
    }

    const handleCardClick = () => {
        // Si el usuario estuvo arrastrando el carrusel, ignoramos el clic
        if (isDraggingRef.current) return

        setLoadingState(true)
        router.push(`/movies/${movie.id}`)
    }

    return (
        <div
            className={styles.movie}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleCardClick}
        >
            {top && <span className={styles.movie_rankBadge}>#{top}</span>}

            <div className={styles.movie_posterWrapper}>
                <Image
                    className={styles.movie_poster}
                    src={movie.poster_path ? BASE_URL_IMG.concat(`${movie.poster_path}`) : URL_IMAGE_NOTCOVER}
                    width={200}
                    height={300}
                    alt={`Poster de ${movie.title}`}
                    draggable={false} // Evita que la imagen se arrastre nativamente por el navegador
                />
                <div className={styles.movie_overlay}></div>


            </div>

            <div className={styles.movie_footer}>
                <div >
                    <h4 className={styles.movie_title} title={movie.title}>{movie.title}</h4>
                    <div className={styles.movie_meta}>

                        <span className={styles.movie_year}>
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
                        </span>
                        <div className={styles.movie_average}>
                            <StarIcon className={styles.movie_icon} />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.movie_optionsContainer}
                >
                    <MediaOptions id={movie.id} type="movie" title={movie.title} viewMenu={viewMenu} setViewMenu={setViewMenu} />
                </div>
            </div>
        </div >
    )
}