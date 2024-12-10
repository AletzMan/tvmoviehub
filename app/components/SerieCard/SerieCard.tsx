"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "./seriecard.module.scss"
import { DetailsIcon, StarIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { ISerie } from "@/app/interfaces/serie"
import { FavoriteButton } from "../FavoriteButton/FavoriteButton"
import { useLoadingState } from "@/app/services/store"
import { MediaOptions } from "../MediaOptions/MediaOptions"
import { useState } from "react"

interface Props {
    serie: ISerie
    top: number
}

export const SerieCard = ({ serie, top }: Props) => {
    const { setLoadingState } = useLoadingState()
    const [viewMenu, setViewMenu] = useState(false)
    return (
        <div key={serie.id} className={styles.movie}>
            <div className={styles.movie_frame}></div>
            <Image className={styles.movie_backdrop} src={serie.poster_path ? BASE_URL_IMG.concat(serie.backdrop_path || '') : URL_IMAGE_NOTCOVER} width={150} height={230} alt={`Poster de ${serie.name}`} />
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={serie.poster_path ? BASE_URL_IMG.concat(serie.poster_path || '') : URL_IMAGE_NOTCOVER} width={160} height={230} alt={`Poster de ${serie.name}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={`${styles.movie_shadowTop} ${viewMenu ? styles.movie_shadowBlur : ""}`}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/series/${serie.id}`} title={serie.name} onClick={() => setLoadingState(true)}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            {<span className={styles.movie_number}>{top}</span>}
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{serie.vote_average.toFixed(1)}</span>
            <MediaOptions id={serie.id} title={serie.name} type="tv" setViewMenu={setViewMenu} viewMenu={viewMenu} />
            <div className={styles.movie_description}>
                {/*<span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>*/}

                <span className={styles.movie_name}>{serie.name}</span>
                <span className={styles.movie_age}>{new Date(serie.first_air_date).getFullYear()}</span>
            </div>
        </div>
    )
}