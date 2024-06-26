"use client"
import { IMovie } from "@/app/interfaces/movie"
import styles from "./mainslider.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { Fragment, useEffect, useRef, useState } from "react"
import { AddIcon, ArrowLeftIcon, DateIcon, LoadingIcon, StarIcon } from "@/app/utils/svg"
import Link from "next/link"

interface Props {
    movies: IMovie[];
}

export const MainSlider = ({ movies }: Props) => {
    const refSlider = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState(-100)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [carouselMovies, setCarouselMovies] = useState<IMovie[]>([])
    const [manualMove, setManualMove] = useState(false)
    const [timeSlider, setTimeSlider] = useState(0)

    useEffect(() => {
        if (movies.length > 0) {
            const extendedMovies = [
                movies[movies.length - 1],
                ...movies,
                movies[0],
            ]
            setCarouselMovies(extendedMovies)
            setPosition(-100) // Start at the first movie
        }
    }, [movies])

    useEffect(() => {
        const slider = refSlider.current
        if (!slider) return

        const handleTransitionEnd = () => {
            setIsTransitioning(false)
            const totalMovies = movies.length

            if (position === -(totalMovies + 1) * 100) {
                setPosition(-100)
            } else if (position === 0) {
                setPosition(-totalMovies * 100)
            }
        }
        const timerPrev = setInterval(() => {
            setTimeSlider(prev => prev + 1.75)
        }, 100)
        slider.addEventListener("transitionend", handleTransitionEnd)

        return () => {
            slider.removeEventListener("transitionend", handleTransitionEnd)
            clearInterval(timerPrev)
            setTimeSlider(0)
        }
    }, [position, movies.length])

    const handleMoveSlider = (move: "left" | "right") => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setManualMove(true)

        if (move === "left") {
            setPosition((prev) => prev + 100)
        } else {
            setPosition((prev) => prev - 100)
        }
    }

    useEffect(() => {
        if (manualMove) {

            const timer = setTimeout(() => {
                setManualMove(false)

            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [manualMove])

    useEffect(() => {
        if (manualMove) return

        const interval = setInterval(() => {
            handleMoveSlider("right")
        }, 3000)

        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manualMove])


    const HandleSetPosition = (pos: number) => {
        setPosition(pos)
    }


    return (
        <article className={styles.article}>
            <button
                className={`${styles.direction} ${styles.direction_left}`}
                onClick={() => handleMoveSlider("left")}
            >
                <ArrowLeftIcon className={`${styles.direction_icon}`} />
            </button>
            <div className={styles.container}>
                {carouselMovies.length === 0 &&
                    <div className={styles.loading}>
                        <LoadingIcon className={styles.loading_icon} />
                        <span className={styles.loading_text} >LOADING</span>
                    </div>
                }
                {carouselMovies.length > 0 &&
                    <div
                        className={styles.slider}
                        ref={refSlider}
                        style={{
                            position: "relative",
                            top: "0",
                            transition: isTransitioning ? "all 0.3s cubic-bezier(.6,.15,.4,1.12)" : "none",
                            display: "flex",
                            width: `${carouselMovies.length * 100}%`,
                            left: `${position}%`,
                            overflow: "hidden"
                        }}
                    >
                        {carouselMovies.map((movie, index) => (
                            <div key={`${movie.id}-${index}`} className={styles.movie} >
                                <div className={styles.movie_cover}>
                                    <div className={styles.movie_description}>
                                        <h3 className={styles.movie_title}>{movie.title}</h3>
                                        <h4 className={styles.movie_subtitle}>{`(${movie.original_title})`}</h4>
                                        <div className={styles.movie_details}>
                                            <p className={styles.movie_average}><StarIcon className={styles.movie_icon} />{movie.vote_average.toFixed(1)}</p>
                                            <Link className={styles.movie_info} href={`/movies/${movie.id}`}><AddIcon className={styles.movie_icon} /> MÁS INFORMACIÓN</Link>
                                        </div>
                                    </div>
                                </div>
                                <Image
                                    className={styles.movie_image}
                                    src={BASE_URL_IMG.concat(movie.backdrop_path)}
                                    width={1250}
                                    height={900}
                                    alt={`Cover de ${movie.title}`}
                                />
                            </div>
                        ))}
                    </div>
                }
                <div className={styles.timebar} style={{ position: "absolute", bottom: "0", height: "0.15em", backgroundColor: "var(--highlightColorBasic)", width: `${timeSlider}%`, transition: "all ease-in-out" }}></div>
            </div>
            <button
                className={`${styles.direction} ${styles.direction_right}`}
                onClick={() => handleMoveSlider("right")}
            >
                <ArrowLeftIcon className={`${styles.direction_icon}`} />
            </button>
            <div className={styles.footer}>
                {
                    carouselMovies.map((point, index) => (
                        <Fragment key={`${point.title}-${index}`}>
                            {index !== 0 && index !== carouselMovies.length - 1 &&
                                <button className={`${styles.footer_point} ${((position / - 100) === index) && styles.footer_pointCurrent}`}
                                    onClick={() => HandleSetPosition(index * -100)}
                                    data-title={point.title}>
                                </button>}
                        </Fragment>
                    ))
                }
            </div>
        </article>
    )
}
