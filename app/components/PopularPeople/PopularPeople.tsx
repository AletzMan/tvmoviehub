"use client"

import { IPeople } from "@/app/interfaces/people"
import styles from "./popularpeople.module.scss"
import { PersonCard } from "@/app/people/components/PersonCard/PersonCard"
import Slider from "react-slick"
import { NextArrow, PrevArrow } from "../ArrowSlider/ArrowSlider"

type Props = {
    people: IPeople[]
}
export const PopularPeople = ({ people }: Props) => {
    return (
        <section className={styles.section}>
            {
                <Slider {...settings}>
                    {people.map((person, index) => (
                        <PersonCard person={person} rank={index + 1} key={person.original_name} />
                    ))}
                </Slider>
            }
        </section>
    )
}

const settings = {
    infinite: true,
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
