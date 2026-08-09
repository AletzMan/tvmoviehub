"use client"

import styles from "./movieslider.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/svg"
import { IPartCollection } from "@/app/interfaces/movie"
import { useRef, PointerEvent, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"

interface Props {
    parts: IPartCollection[]
    title: string
}

export const MovieSlider = ({ parts, title }: Props) => {
    const router = useRouter()
    const { setLoadingState } = useLoadingState()
    const settings = {
        infinite: false,
        speed: 700,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 500,
        arrows: true,
        dots: false,
        rows: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    const handleCardClick = (movie: IPartCollection, isDragging: boolean) => {
        if (isDragging) return
        setLoadingState(true)
        router.push(movie.media_type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`)
    }

    return (
        <div className={styles.slider}>
            <h4 className={styles.cast_title}>{title}</h4>
            <div className={styles.cast_container}>
                <Slider {...settings} variableWidth rows={1} swipeToSlide swipe >
                    {
                        parts.map(movie => {
                            const pointerPos = useRef({ x: 0, y: 0 })
                            const isDraggingRef = useRef(false)
                            const [viewMenu, setViewMenu] = useState(false)

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

                            return (
                                <div
                                    key={movie.id}
                                    className={styles.movie}
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onClick={() => handleCardClick(movie, isDraggingRef.current)}
                                >
                                    <div className={styles.movie_posterWrapper}>
                                        <Image
                                            className={styles.movie_poster}
                                            src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path) : URL_IMAGE_NOTCOVER}
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
                                                    {(movie.release_date || movie.first_air_date) ? new Date(movie.release_date || movie.first_air_date || "").getFullYear() : "N/A"}
                                                </span>
                                                <div className={styles.movie_average}>
                                                    <StarIcon className={styles.movie_icon} />
                                                    <span>{movie.vote_average?.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className={styles.movie_optionsContainer}
                                        >
                                            <MediaOptions id={movie.id} type={movie.media_type as "movie" | "tv"} title={movie.title || movie.name || ""} viewMenu={viewMenu} setViewMenu={setViewMenu} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}