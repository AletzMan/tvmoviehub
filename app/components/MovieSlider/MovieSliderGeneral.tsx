"use client"

import { ReactNode } from "react"
import styles from "./movieslider.module.scss"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"
import { ArrowLeftIcon } from "@/app/utils/svg"

interface Props {
    title: string
    children: ReactNode
    list_link?: string
}

export const MovieSliderGeneral = ({ title, children, list_link }: Props) => {

    const settings = {
        infinite: false,
        speed: 700,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 500,
        arrows: true,
        dots: false,
        rows: 1,
        nextArrow: <div><ArrowLeftIcon className="" /></div>

    }

    return (
        <div className={styles.slider} >
            <header className={styles.slider_header} >
                <h4 className={styles.slider_title}>{title}</h4>
                {list_link && <Link className={styles.slider_view} href={`/movies/lists/${list_link}`}>Ver todo</Link>}
            </header>
            <div className={styles.slider_container}  >
                <Slider {...settings} swipeToSlide swipe variableWidth >
                    {children}
                </Slider>
            </div>
        </div>
    )
}