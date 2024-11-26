"use client"
import { ICast, ICredits, ICrew } from "@/app/interfaces/credits"
import styles from "./slidercrew.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { ArrowLeftIcon } from "@/app/utils/svg"
import { useEffect, useRef, useState } from "react"
import { ICreatedBy } from "@/app/interfaces/serie"
import Link from "next/link"
import { useLoadingState } from "@/app/services/store"

interface Props {
    credits?: ICredits
    created_by?: ICreatedBy[]
    type: "cast" | "crew"
    title: string
}

export const SliderCrew = ({ credits, created_by, type, title }: Props) => {
    const refContainer = useRef<null | HTMLDivElement>(null)
    const [scrollLeft, setScrollLeft] = useState(0)
    const { setLoadingState } = useLoadingState()

    useEffect(() => {

        const container = refContainer?.current
        if (container !== null) {

            const UpdateScroll = () => {
                setScrollLeft(container.scrollLeft)
            }

            container.addEventListener("scroll", UpdateScroll)

            return () => container?.removeEventListener("scroll", UpdateScroll)
        }
    }, [])



    const MoveScroll = (direction: "left" | "right") => {
        const container = refContainer.current
        if (container) {
            const widthContainer = container.getBoundingClientRect().width
            const scrollWidth = container.scrollWidth - widthContainer

            if (direction === "left") {
                let newScroll = scrollLeft + (widthContainer / 2)
                if (newScroll <= scrollWidth) {
                    setScrollLeft(newScroll)
                } else {
                    setScrollLeft(scrollWidth)
                }
                container.scrollTo({ left: newScroll })
            } else {
                let newScroll = scrollLeft - (widthContainer / 2)
                if (newScroll < 0) {
                    setScrollLeft(0)
                } else {

                    setScrollLeft(newScroll)
                }
                container.scrollTo({ left: newScroll })
            }
        }
    }



    return (
        <div className={styles.slider}>
            <h4 className={styles.cast_title}>{title}</h4>
            <article className={styles.cast}>
                {scrollLeft > 0 && <button className={styles.cast_arrow} onClick={() => MoveScroll("right")}><ArrowLeftIcon className={styles.cast_arrowIcon} /></button>}
                <div className={`${styles.cast_container} scrollBarStyleX`} ref={refContainer}>
                    {credits &&
                        credits[type].map(actor => (
                            <Link key={actor.credit_id} className={styles.actor} href={`/people/${actor.id}`} title={`Ver biografía de ${actor.name}`} onClick={() => setLoadingState(true)}>
                                <Image className={styles.actor_photo} src={actor.profile_path ? BASE_URL_IMG.concat(actor.profile_path || '') : "/not_photo.png"} width={80} height={80} alt={`Foto de ${actor.name}`} />
                                <div className={styles.actor_description}>
                                    <span className={styles.actor_name}>{actor.name}</span>
                                    {actor as ICast && <span className={styles.actor_character}>{(actor as ICast).character}</span>}
                                    {actor as ICrew && <span className={styles.actor_character}>{(actor as ICrew).job}</span>}
                                </div>
                            </Link>
                        ))
                    }
                    {created_by &&
                        created_by.map(actor => (
                            <Link key={actor.credit_id} className={styles.actor} href={`/people/${actor.id}`} title={`Ver biografía de ${actor.name}`} onClick={() => setLoadingState(true)}>
                                <Image className={styles.actor_photo} src={actor.profile_path ? BASE_URL_IMG.concat(actor.profile_path || '') : "/not_photo.png"} width={80} height={80} alt={`Foto de ${actor.name}`} />
                                <div className={styles.actor_description}>
                                    <span className={styles.actor_name}>{actor.name}</span>
                                    {actor as ICast && <span className={styles.actor_character}>{(actor as ICast).character}</span>}
                                    {actor as ICrew && <span className={styles.actor_character}>{(actor as ICrew).job}</span>}
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <button className={styles.cast_arrow} onClick={() => MoveScroll("left")}><ArrowLeftIcon className={`${styles.cast_arrowIcon} ${styles.cast_arrowIconRight} `} /></button>
            </article>
        </div>
    )
}