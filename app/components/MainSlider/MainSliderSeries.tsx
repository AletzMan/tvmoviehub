"use client"
import styles from "./mainslider.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { useEffect, useState } from "react"
import { AddIcon, StarIcon } from "@/app/utils/svg"
import { ISerie } from "@/app/interfaces/serie"
import Link from "next/link"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Props {
    movies: ISerie[];
}

export const MainSliderSeries = ({ movies }: Props) => {
    const [carouselMovies, setCarouselMovies] = useState<ISerie[]>([])

    useEffect(() => {
        if (movies.length > 0) {
            const extendedMovies = [
                movies[movies.length - 1],
                ...movies,
                movies[0],
            ]
            setCarouselMovies(extendedMovies)
        }
    }, [movies])


    return (
        <article className={styles.article}>
            <Slider  {...settings} >
                {carouselMovies.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className={styles.movie} >
                        <div className={styles.movie_cover}>
                            <div className={styles.movie_description}>
                                <h3 className={styles.movie_title}>{movie.name}</h3>
                                <h4 className={styles.movie_subtitle}>{`(${movie.original_name})`}</h4>
                                <div className={styles.movie_details}>
                                    <p className={styles.movie_average}><StarIcon className={styles.movie_icon} />{movie.vote_average.toFixed(1)}</p>
                                    <Link className={styles.movie_info} href={`/series/${movie.id}`}><AddIcon className={styles.movie_icon} /> MÁS INFORMACIÓN</Link>
                                </div>

                            </div>
                        </div>
                        <Image
                            className={styles.movie_image}
                            src={BASE_URL_IMG.concat(movie.backdrop_path)}
                            width={1980}
                            height={900}
                            alt={`Cover de ${movie.name}`}
                        />
                    </div>
                ))}
            </Slider>
        </article>
    )
}

const settings = {
    customPaging: function (i: number) {
        return (
            <a className={styles.slider_dots}>
                {i}
            </a>
        )
    },
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 1500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    rows: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,
    swipe: true
}