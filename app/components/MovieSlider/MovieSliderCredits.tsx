"use client"

import styles from "./movieslider.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { AddIcon, DetailsIcon, FavoriteFullIcon, MovieIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import Link from "next/link"
import { IParticipationsCast, IParticipationsCrew } from "@/app/interfaces/credits"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"
import { FavoriteButton } from "../FavoriteButton/FavoriteButton"

interface Props {
    parts: IParticipationsCast[] | IParticipationsCrew[]
    title?: string
    type: 'movie' | 'tv'
}

export const MovieSliderCredits = ({ parts, title, type }: Props) => {

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

    return (
        <div className={styles.slider}>
            {title && <h4 className={styles.cast_title}>{title}</h4>}
            <div className={styles.cast_container}>
                <Slider {...settings} variableWidth rows={1} swipeToSlide swipe >
                    {
                        parts.map(movie => (
                            <div key={movie.id} className={styles.movie}>
                                <div className={styles.movie_picture}>
                                    {<Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path || '') : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"} width={150} height={200} alt={`Poster de ${movie.title}`} />}
                                </div>
                                <div className={styles.movie_shadow}></div>
                                <div className={styles.movie_dialog}>
                                    <Link className={styles.movie_dialogMore} href={type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`} title={movie.title}>
                                        <DetailsIcon className={styles.movie_dialogIcon} />
                                    </Link>
                                </div>
                                <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie.vote_average.toFixed(1)}</span>
                                <FavoriteButton id={movie.id} title={movie.title} type="movie" />
                                <div className={styles.movie_description}>
                                    {type === "movie" && <span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>}
                                    {type === "tv" && <span className={styles.movie_type}><SerieIcon className={styles.movie_typeIcon} />Serie</span>}
                                    <span className={styles.movie_name}>{movie.title}</span>
                                    <span className={styles.movie_age}>{new Date(movie.release_date || movie.release_date).getFullYear()}</span>
                                    <span className={styles.movie_job}>{movie.job}</span>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}