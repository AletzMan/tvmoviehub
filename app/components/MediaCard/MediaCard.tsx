"use client"

import styles from "./mediacard.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/svg"
import { useRef, PointerEvent, useState, ReactNode } from "react"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"

export interface MediaCardProps {
    id: number
    title: string
    posterPath?: string | null
    year?: string | number
    voteAverage?: number
    type?: 'movie' | 'tv' | 'person'
    href?: string
    onClick?: () => void
    showOptions?: boolean
    showRank?: number
    extraContent?: ReactNode
    actions?: ReactNode
    className?: string
}

export const MediaCard = ({
    id,
    title,
    posterPath,
    year,
    voteAverage,
    type = 'movie',
    href,
    onClick,
    showOptions = true,
    showRank,
    extraContent,
    actions,
    className
}: MediaCardProps) => {
    const router = useRouter()
    const { setLoadingState } = useLoadingState()
    const [viewMenu, setViewMenu] = useState(false)

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

        if (onClick) {
            onClick()
        } else if (href) {
            setLoadingState(true)
            router.push(href)
        }
    }

    const imageUrl = posterPath ? BASE_URL_IMG.concat(posterPath) : URL_IMAGE_NOTCOVER
    const displayYear = typeof year === 'number' ? year : year ? (() => {
        const date = new Date(year)
        return isNaN(date.getTime()) ? year : date.getFullYear()
    })() : "N/A"

    // Ensure displayYear is always a string to avoid React warnings
    const displayYearString = typeof displayYear === 'number' ? String(displayYear) : displayYear

    return (
        <div
            className={`${styles.mediaCard} ${className || ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleCardClick}
        >
            {showRank && <span className={styles.mediaCard_rankBadge}>#{showRank}</span>}

            <div className={styles.mediaCard_posterWrapper}>
                <Image
                    className={styles.mediaCard_poster}
                    src={imageUrl}
                    width={200}
                    height={300}
                    alt={`Poster de ${title}`}
                    draggable={false}
                />
                <div className={styles.mediaCard_overlay}></div>
            </div>

            <div className={styles.mediaCard_footer}>
                <div>
                    <h4 className={styles.mediaCard_title} title={title}>{title}</h4>
                    <div className={styles.mediaCard_meta}>
                        <span className={styles.mediaCard_year}>{displayYearString}</span>
                        {voteAverage !== undefined && (
                            <div className={styles.mediaCard_average}>
                                <StarIcon className={styles.mediaCard_icon} />
                                <span>{voteAverage.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                    {extraContent}
                </div>

                <div className={styles.mediaCard_actions}>
                    {actions}
                    {showOptions && type !== 'person' && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={styles.mediaCard_optionsContainer}
                        >
                            <MediaOptions id={id} type={type as "movie" | "tv"} title={title} viewMenu={viewMenu} setViewMenu={setViewMenu} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
