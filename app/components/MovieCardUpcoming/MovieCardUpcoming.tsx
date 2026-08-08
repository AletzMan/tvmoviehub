"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "./moviecard.module.scss"
import { DetailsIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { IMovie } from "@/app/interfaces/movie"
import { FormattedDateUpcoming } from "@/app/utils/helpers"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useRef, useState, PointerEvent } from "react"
import { useRouter } from "next/navigation"

interface Props {
    movie: IMovie
}

export const MovieCardUpcoming = ({ movie }: Props) => {
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
        <div key={movie.id} className={styles.movie}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleCardClick}>
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path || '') : URL_IMAGE_NOTCOVER} width={195} height={245} alt={`Poster de ${movie.title}`} />
                <div className={styles.movie_overlay}></div>
            </div>
            <div onClick={(e) => e.stopPropagation()}
                className={styles.movie_optionsContainer}
            >
                <MediaOptions id={movie.id} viewMenu={viewMenu} setViewMenu={setViewMenu} title={movie.title} type="movie" />
            </div>
            <div className={styles.movie_description}>
                <span className={styles.movie_name}>{movie.title}</span>
                <span className={styles.movie_age}>{FormattedDateUpcoming(movie.release_date)}</span>
            </div>
        </div>
    )
}