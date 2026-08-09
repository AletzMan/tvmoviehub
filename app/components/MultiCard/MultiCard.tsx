"use client"
import styles from "./multicard.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { StarIcon, FemaleIcon, MaleIcon } from "@/app/utils/svg"
import { IResult } from "@/app/interfaces/multi"
import { useState, useRef, PointerEvent } from "react"

interface Props {
    result: IResult
}

export function MultiCard({ result }: Props) {
    const router = useRouter()
    const [load, setLoad] = useState(true)

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

        const href = result.media_type === "movie" ? `/movies/${result.id}` : result.media_type === "tv" ? `/series/${result.id}` : `/people/${result.id}`
        router.push(href)
    }

    const handleLoadImage = () => {
        setLoad(false)
    }

    const getImageUrl = () => {
        if (result.poster_path) {
            return BASE_URL_IMG.concat(result.poster_path)
        }
        if (result.profile_path) {
            return BASE_URL_IMG.concat(result.profile_path)
        }
        return URL_IMAGE_NOTCOVER
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
                    src={getImageUrl()}
                    width={200}
                    height={300}
                    alt={`Poster de ${result.title || result.name}`}
                    draggable={false}
                />
                <div className={styles.movie_overlay}></div>
            </div>

            <div className={styles.movie_footer}>
                <div>
                    <h4 className={styles.movie_title} title={result.title || result.name}>{result.title || result.name}</h4>
                    <div className={styles.movie_meta}>
                        {(result.media_type === "movie" || result.media_type === "tv") && (
                            <span className={styles.movie_year}>
                                {(result?.release_date || result?.first_air_date) ? new Date(result?.release_date || result?.first_air_date || "").getFullYear() : "N/A"}
                            </span>
                        )}
                        {(result.media_type === "movie" || result.media_type === "tv") && (
                            <div className={styles.movie_average}>
                                <StarIcon className={styles.movie_icon} />
                                <span>{result?.vote_average?.toFixed(1)}</span>
                            </div>
                        )}
                        {result.media_type === "person" && (
                            <span className={styles.movie_gender}>
                                {result.gender === 1 ?
                                    <FemaleIcon className={styles.movie_genderFemale} />
                                    :
                                    <MaleIcon className={styles.movie_genderMale} />
                                }
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}