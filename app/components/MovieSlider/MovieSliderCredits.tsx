"use client"

import styles from "./movieslider.module.scss"
import { MediaCard } from "../MediaCard/MediaCard"
import { IParticipationsCast, IParticipationsCrew } from "@/app/interfaces/credits"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"

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
                            <MediaCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path}
                                year={movie.release_date}
                                voteAverage={movie.vote_average}
                                type={type}
                                href={type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`}
                                showOptions={true}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}