"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import styles from "./seriecard.module.scss"
import { StarIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { ISerie } from "@/app/interfaces/serie"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useState, useRef, PointerEvent } from "react"

interface Props {
    serie: ISerie
    top?: number
}

export const SerieCard = ({ serie, top }: Props) => {
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
        router.push(`/series/${serie.id}`)
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
                    src={serie.poster_path ? BASE_URL_IMG.concat(`${serie.poster_path}`) : URL_IMAGE_NOTCOVER}
                    width={200}
                    height={300}
                    alt={`Poster de ${serie.name}`}
                    draggable={false}
                />
                <div className={styles.movie_overlay}></div>
            </div>

            <div className={styles.movie_footer}>
                <div>
                    <h4 className={styles.movie_title} title={serie.name}>{serie.name}</h4>
                    <div className={styles.movie_meta}>
                        <span className={styles.movie_year}>
                            {serie.first_air_date ? new Date(serie.first_air_date).getFullYear() : ""}
                        </span>
                        <div className={styles.movie_average}>
                            <StarIcon className={styles.movie_icon} />
                            <span>{serie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.movie_optionsContainer}
                >
                    <MediaOptions id={serie.id} type="tv" title={serie.name} viewMenu={viewMenu} setViewMenu={setViewMenu} />
                </div>
            </div>
        </div>
    )
}