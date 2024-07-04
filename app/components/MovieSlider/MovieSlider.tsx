"use client"

import styles from "./movieslider.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { AddIcon, FavoriteFullIcon, MovieIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import { IPartCollection } from "@/app/interfaces/movie"
import Link from "next/link"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"

interface Props {
    parts: IPartCollection[]
    title: string
}

export const MovieSlider = ({ parts, title }: Props) => {

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
            <h4 className={styles.cast_title}>{title}</h4>
            <div className={styles.cast_container}  >
                <Slider {...settings} variableWidth rows={1} swipeToSlide swipe >

                    {
                        parts.map(movie => (
                            <div key={movie.id} className={styles.movie}>
                                <div className={styles.movie_picture}>
                                    <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path || '') : "/not_photo.png"} width={157} height={210} alt={`Poster de ${movie.title}`} />
                                </div>
                                <div className={styles.movie_shadow}></div>
                                <div className={styles.movie_dialog}>
                                    <Link className={styles.movie_dialogMore} href={movie.media_type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`} title={movie.title}>
                                        <AddIcon className={styles.movie_dialogIcon} />
                                    </Link>
                                </div>
                                <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie.vote_average?.toFixed(1)}</span>
                                <button className={styles.movie_fav}><FavoriteFullIcon className={styles.movie_favIcon} /> </button>
                                <div className={styles.movie_description}>
                                    {movie.media_type && movie.media_type === "movie" && <span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>}
                                    {movie.media_type && movie.media_type === "tv" && <span className={styles.movie_type}><SerieIcon className={styles.movie_typeIcon} />Serie</span>}
                                    <span className={styles.movie_name}>{movie.title || movie.name}</span>
                                    <span className={styles.movie_age}>{(movie.release_date || movie.first_air_date) ? new Date(movie.release_date || movie.first_air_date || "").toISOString().split("-")[0] : ""}</span>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}