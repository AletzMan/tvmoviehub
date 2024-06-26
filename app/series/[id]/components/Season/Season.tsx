"use client"

import Image from "next/image"
import { IEpisode, ISeason, ISeasonDetails } from "@/app/interfaces/serie"
import styles from "./season.module.scss"
import { BASE_URL_IMG } from "@/app/utils/const"
import { ComboBox } from "@/app/components/ComboBox/ComboBox"
import React, { ChangeEvent, Fragment, useEffect, useState } from "react"
import { GetSeasonDetails } from "@/app/services/fetchData"
import { ConvertMinutesToHours } from "@/app/utils/helpers"
import { StarIcon, TimeIcon } from "@/app/utils/svg"
import { Average } from "@/app/components/Average/Average"

interface Props {
    seasons: ISeason[]
    idSerie: number
    children: React.ReactElement
}

export const Season = ({ seasons, idSerie, children }: Props) => {
    const [currentSeason, setCurrentSeason] = useState<ISeason>(seasons[0])
    const [currentEpisodes, setCurrentEpisodes] = useState<IEpisode[]>()

    useEffect(() => {
        const GetEpisodes = async () => {
            console.log(idSerie.toString())
            console.log(currentSeason.season_number)
            const details = await GetSeasonDetails(idSerie.toString(), currentSeason.season_number)
            console.log(details)
            setCurrentEpisodes(details.episodes)
        }
        GetEpisodes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSeason])

    const HandleChangeSeason = (e: ChangeEvent<HTMLSelectElement>) => {
        const seasonSelect: number = Number(e.currentTarget.value)
        setCurrentSeason(seasons[seasonSelect])
    }

    return (
        <section className={styles.section}>
            <article className={styles.season}>
                <div className={styles.season_select}>
                    <ComboBox number={seasons.filter(season => season.season_number !== 0 && season.episode_count > 0).length} onChange={HandleChangeSeason} />
                    {currentSeason && <Image src={BASE_URL_IMG.concat(seasons[currentSeason?.season_number]?.poster_path || "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg")} alt={seasons[currentSeason?.season_number]?.name} width={145} height={200} />}
                </div>
                <div className={styles.season_overview}>
                    {children}
                </div>
            </article>
            <article className={styles.section_episodes}>
                {currentEpisodes?.map(episode => (
                    <div className={styles.section_episode} key={episode.id}>
                        <picture className={styles.section_picture} >
                            <dialog className={`${styles.section_overview} scrollBarStyle`} open>
                                <p className={styles.section_overviewText} >{episode.overview}</p>
                            </dialog>
                            <Image className={styles.section_image} src={episode.still_path ? BASE_URL_IMG.concat(episode.still_path || "") : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available_view.jpg"} alt={episode.name} width={300} height={240} />
                        </picture>
                        <div className={styles.section_description}>
                            <span className={styles.section_descriptionName}>{episode.name}</span>
                            <span className={styles.section_descriptionTime}><TimeIcon className={styles.section_descriptionTimeIcon} />{ConvertMinutesToHours(episode.runtime)}</span>
                            <div className={styles.section_descriptionAverage}>
                                <Average average={episode.vote_average} />
                            </div>
                        </div>
                    </div>
                ))}
            </article>
        </section>
    )
}