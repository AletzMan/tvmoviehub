"use client"

import { ReactNode } from "react"
import styles from "./movieslider.module.scss"
import Slider from "react-slick"

interface Props {
    title: string
    children: ReactNode
}

export const MovieSliderGeneral = ({ title, children }: Props) => {

    const settings = {
        infinite: false,
        speed: 700,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 500,
        arrows: true,
        dots: false,
        rows: 1
    }

    return (
        <div className={styles.slider} >
            <h4 className={styles.cast_title}>{title}</h4>
            <div className={styles.cast_container}  >
                <Slider {...settings} variableWidth rows={1} swipeToSlide swipe adaptiveHeight>
                    {children}
                </Slider>
            </div>
        </div>
    )
}