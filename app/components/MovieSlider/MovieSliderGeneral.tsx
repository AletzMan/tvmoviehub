"use client"

import { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from "react"
import styles from "./movieslider.module.scss"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"
import { ArrowLeftIcon } from "@/app/utils/svg"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"

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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />

    }

    return (
        <div className={styles.slider} >
            <header className={styles.slider_header} >
                <h4 className={styles.slider_title}>{title}</h4>
                {list_link && <Link className={styles.slider_view} href={`${list_link}&page=1`}>Ver todo</Link>}
            </header>
            <div className={styles.slider_container}  >
                <Slider {...settings} swipeToSlide swipe variableWidth>
                    {children}
                </Slider>
            </div>
        </div>
    )
}