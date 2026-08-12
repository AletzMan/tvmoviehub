"use client"

import styles from "./mediacard.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/svg"
import { useState, ReactNode } from "react"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useDragPreventClick } from "@/app/hooks/useDragPreventClick"

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
    aspectRatio?: string
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
    className,
    aspectRatio = "8/11",
}: MediaCardProps) => {
    const router = useRouter()
    const { setLoadingState } = useLoadingState()
    const { handlePointerDown, handlePointerMove, handleClick } = useDragPreventClick()

    const handleCardClick = () => {
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
            onClick={handleClick(handleCardClick)}
        >
            {showRank &&
                <div className={styles.mediaCard_rankBadge}>
                    <svg width="60"
                        height="40"
                        viewBox="95 85 62 45"
                        className={styles.mediaCard_svg}>
                        <path d="m 155.69565,88.066944 -7.17837,0.0155 h -42.56949 c -5.97531,-2e-6 -10.819497,4.844179 -10.819498,10.819492 v 25.735904 l -0.01395,3.96255 c 0.359393,-1.88082 2.148328,-3.74066 4.234368,-3.96255 h 34.63716 c 8.02567,0 14.53142,-6.50626 14.53142,-14.53193 V 98.411016 c 0,-4.577005 3.2152,-8.860428 7.17837,-10.344075 z"></path>
                    </svg>
                    <span>#{showRank}</span>
                </div>
            }


            <div className={styles.mediaCard_posterWrapper} style={{ aspectRatio }}>
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
                            <MediaOptions id={id} type={type as "movie" | "tv"} title={title} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
