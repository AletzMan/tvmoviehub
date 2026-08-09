"use client"

import styles from "./movieslider.module.scss"
import { MediaCard } from "../MediaCard/MediaCard"
import { IPartCollection } from "@/app/interfaces/movie"
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
            <div className={styles.cast_container}>
                <Slider {...settings} variableWidth rows={1} swipeToSlide swipe >
                    {
                        parts.map(movie => (
                            <MediaCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title || movie.name || "Sin título"}
                                posterPath={movie.poster_path}
                                year={movie.release_date || movie.first_air_date}
                                voteAverage={movie.vote_average}
                                type={movie.media_type === "tv" ? "tv" : "movie"}
                                href={movie.media_type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`}
                                showOptions={true}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}