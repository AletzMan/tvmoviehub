"use client"
import { IMovie } from "@/app/interfaces/movie"
import styles from "./mainslider.module.scss"
import Image from "next/image"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { useEffect, useState, MouseEvent } from "react"
import { AddIcon, LoadingIcon, StarIcon } from "@/app/utils/svg"
import Link from "next/link"
import Slider from "react-slick"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { LoadingPage } from "../LoadingPage/LoadingPage"

interface Props {
    movies: IMovie[];
}

export const MainSlider = ({ movies }: Props) => {
    const [carouselMovies, setCarouselMovies] = useState<IMovie[]>([])
    const [loading, setLoading] = useState(false)

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



    function HandleLoading(event: MouseEvent<HTMLAnchorElement>): void {
        setLoading(true)
    }

    return (
        <article className={styles.article} >
            <Slider  {...settings} >
                {carouselMovies.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className={styles.movie} >
                        <div className={styles.movie_cover}>
                            <div className={styles.movie_description}>
                                <h3 className={styles.movie_title}>{movie.title}</h3>
                                <h4 className={styles.movie_subtitle}>{`(${movie.original_title})`}</h4>
                                <div className={styles.movie_details}>
                                    <p className={styles.movie_average}><StarIcon className={styles.movie_icon} />{movie.vote_average.toFixed(1)}</p>
                                    <Link className={styles.movie_info} onClick={HandleLoading} href={`/movies/${movie.id}`}><AddIcon className={styles.movie_icon} /> MÁS INFORMACIÓN</Link>
                                </div>
                            </div>
                        </div>
                        <Image
                            className={styles.movie_image}
                            src={BASE_URL_IMG_CUSTOM.concat(`original/`.concat(movie.backdrop_path as string) || 'https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available_view.jpg')}
                            width={1980}
                            height={900}
                            alt={`Cover de ${movie.title}`}
                        />
                    </div>
                ))}
                {/*<div className={styles.timebar} style={{ position: "absolute", bottom: "0", height: "0.15em", backgroundColor: "var(--highlightColorBasic)", width: `${timeSlider}%`, transition: "all ease-in-out" }}></div>*/}
            </Slider>
            {loading &&
                <LoadingPage />
            }
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