"use client"
import styles from "./multicard.module.scss"
import Link from "next/link"
import Image from "next/image"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { DetailsIcon, FavoriteFullIcon, FemaleIcon, LoadingIcon, MaleIcon, MovieIcon, PeopleIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import { IResult } from "@/app/interfaces/multi"
import { useState } from "react"

interface Props {
    result: IResult
}

export function MultiCard({ result }: Props) {
    const [load, setLoad] = useState(true)

    const HandleLoadImage = () => {
        setLoad(false)
    }

    return (
        <div key={result.id} className={styles.movie}>
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} onLoad={HandleLoadImage} src={result.poster_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(result.poster_path)) : result.profile_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(result.profile_path)) : "/not_photo.png"} width={185} height={260} alt={`Poster de ${result.title}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={result.media_type === "movie" ? `/movies/${result.id}` : result.media_type === "tv" ? `/series/${result.id}` : `/people/${result.id}`} title={result.title}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            {(result.media_type === "movie" || result.media_type === "tv") && <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{result?.vote_average?.toFixed(1)}</span>}
            <button className={styles.movie_fav}><FavoriteFullIcon className={styles.movie_favIcon} /> </button>
            <div className={styles.movie_description}>
                {result.media_type === "movie" && <span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>}
                {result.media_type === "tv" && <span className={styles.movie_type}><SerieIcon className={styles.movie_typeIcon} />Serie</span>}
                {result.media_type === "person" && <span className={styles.movie_type}><PeopleIcon className={styles.movie_typeIcon} />Persona</span>}
                <span className={styles.movie_name}>{result.title || result.name}</span>
                {(result.media_type === "movie" || result.media_type === "tv") && <span className={styles.movie_age}>{(result?.release_date || result?.first_air_date) ? new Date(result?.release_date || result?.first_air_date || "")?.toISOString().split("-")[0] : "N/A"}</span>}
                {result.media_type === "person" && <span className={styles.movie_age}>
                    {result.gender === 1 ?
                        <FemaleIcon className={`${styles.movie_gender} ${styles.movie_genderFemale}`} />
                        :
                        <MaleIcon className={`${styles.movie_gender} ${styles.movie_genderMale}`} />
                    }
                </span>}
            </div>
            {load && <LoadingIcon className={styles.loading} />}
        </div>
    )
}