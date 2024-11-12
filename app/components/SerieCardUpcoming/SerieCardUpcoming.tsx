import Image from "next/image"
import Link from "next/link"
import styles from "./moviecard.module.scss"
import { DetailsIcon, FavoriteFullIcon } from "@/app/utils/svg"
import { BASE_URL_IMG } from "@/app/utils/const"
import { FormattedDateUpcoming } from "@/app/utils/helpers"
import { ISerie } from "@/app/interfaces/serie"

interface Props {
    serie: ISerie
}

export const SerieCardUpcoming = ({ serie }: Props) => {
    return (
        <div key={serie.id} className={styles.movie}>
            <Image className={styles.movie_backdrop} src={serie.poster_path ? BASE_URL_IMG.concat(serie.backdrop_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${serie.name}`} />
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={serie.poster_path ? BASE_URL_IMG.concat(serie.poster_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${serie.name}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/series/${serie.id}`} title={serie.name}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            <button className={styles.movie_fav}><FavoriteFullIcon className={styles.movie_favIcon} /> </button>
            <div className={styles.movie_description}>
                {/*<span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>*/}

                <span className={styles.movie_name}>{serie.name}</span>
                <span className={styles.movie_age}>{FormattedDateUpcoming(serie.first_air_date)}</span>
            </div>
        </div>
    )
}