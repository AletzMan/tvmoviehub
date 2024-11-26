"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "./seriecard.module.scss"
import { DetailsIcon, StarIcon } from "@/app/utils/svg"
import { BASE_URL_IMG } from "@/app/utils/const"
import { ISerie } from "@/app/interfaces/serie"
import { FavoriteButton } from "../FavoriteButton/FavoriteButton"
import { useLoadingState } from "@/app/services/store"

interface Props {
    serie: ISerie
    top: number
}

export const SerieCard = ({ serie, top }: Props) => {
    const { setLoadingState } = useLoadingState()
    return (
        <div key={serie.id} className={styles.movie}>
            <Image className={styles.movie_backdrop} src={serie.poster_path ? BASE_URL_IMG.concat(serie.backdrop_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${serie.name}`} />
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={serie.poster_path ? BASE_URL_IMG.concat(serie.poster_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${serie.name}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/series/${serie.id}`} title={serie.name} onClick={() => setLoadingState(true)}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            {<span className={styles.movie_number}>{top}</span>}
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{serie.vote_average.toFixed(1)}</span>
            <FavoriteButton id={serie.id} title={serie.name} type="tv" />
            <div className={styles.movie_description}>
                {/*<span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>*/}

                <span className={styles.movie_name}>{serie.name}</span>
                <span className={styles.movie_age}>{new Date(serie.first_air_date).getFullYear()}</span>
            </div>
        </div>
    )
}