"use client"

import { ReactNode } from "react"
import styles from "./movieslider.module.scss"
import dynamic from "next/dynamic"
import Link from "next/link"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"

// Importamos react-slick de forma dinámica para evitar problemas con SSR
const Slider = dynamic(() => import("react-slick"), { ssr: false })

// Importamos únicamente los estilos CSS necesarios para que funcione visualmente
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Props {
    title: string
    children: ReactNode
    list_link?: string
}

export const MovieSliderGeneral = ({ title, children, list_link }: Props) => {
    const settings = {
        infinite: false,
        speed: 700,
        slidesToShow: 7,
        slidesToScroll: 1,     // <--- Crucial: Permite que avance de 1 en 1 de forma fluida sin romper el cálculo de anchos
        variableWidth: false,
        swipe: true,
        swipeToSlide: true,    // <--- Permite arrastrar de forma natural y libre hasta el límite
        autoplay: false,
        arrows: true,
        dots: false,
        rows: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    return (
        <div className={styles.slider}>
            <header className={styles.slider_header}>
                <h4 className={styles.slider_title}>{title}</h4>
                {list_link && <Link className={styles.slider_view} href={`${list_link}&page=1`}>Ver todo</Link>}
            </header>
            <div className={styles.slider_container}>
                <Slider {...settings}>
                    {children}
                </Slider>
            </div>
        </div>
    )
}