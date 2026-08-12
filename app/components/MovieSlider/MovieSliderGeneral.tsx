"use client"

import { ReactNode } from "react"
import styles from "./movieslider.module.scss"
import dynamic from "next/dynamic"
import Link from "next/link"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"

// Importamos react-slick de forma dinámica para evitar problemas con SSR
//const Slider = dynamic(() => import("react-slick"), { ssr: false })

// Importamos únicamente los estilos CSS necesarios para que funcione visualmente
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

interface Props {
    title: string
    children: ReactNode
    list_link?: string
    slidesToShow?: number
}

export const MovieSliderGeneral = ({ title, children, list_link, slidesToShow = 7 }: Props) => {
    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: slidesToShow, // Tu valor base para pantallas grandes
        slidesToScroll: 1,
        variableWidth: false,
        swipe: true,
        swipeToSlide: true,
        autoplay: false,
        arrows: true,
        dots: false,
        adaptiveHeight: true,
        rows: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1280, // Pantallas grandes / Laptops
                settings: {
                    slidesToShow: Math.min(slidesToShow, 4),
                }
            },
            {
                breakpoint: 1024, // Tablets horizontales
                settings: {
                    slidesToShow: Math.min(slidesToShow, 3),
                }
            },
            {
                breakpoint: 768, // Tablets verticales / Celulares grandes
                settings: {
                    slidesToShow: 2,
                    arrows: false // Oculta las flechas en touch para mejor espacio
                }
            },
            {
                breakpoint: 480, // Celulares pequeños
                settings: {
                    slidesToShow: 1.2, // Muestra parte de la siguiente tarjeta para invitar al swipe
                    arrows: false
                }
            }
        ]
    };

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