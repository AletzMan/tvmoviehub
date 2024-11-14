import Image from "next/image"
import Link from "next/link"
import styles from "./moviecard.module.scss"
import { DetailsIcon, FavoriteFullIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { IMovie } from "@/app/interfaces/movie"
import { FormattedDateUpcoming } from "@/app/utils/helpers"
import { FavoriteButton } from "../FavoriteButton/FavoriteButton"

interface Props {
    movie: IMovie
}

export const MovieCardUpcoming = ({ movie }: Props) => {
    return (
        <div key={movie.id} className={styles.movie}>
            <Image className={styles.movie_backdrop} src={movie.poster_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(movie.poster_path)) : "/not_photo.png"} width={150} height={230} alt={`Poster de ${movie.title}`} />
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${movie.title}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/movies/${movie.id}`} title={movie.title}>
                    <DetailsIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            <FavoriteButton id={movie.id} title={movie.title} type="movie" />
            <div className={styles.movie_description}>
                {/*<span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>*/}

                <span className={styles.movie_name}>{movie.title}</span>
                <span className={styles.movie_age}>{FormattedDateUpcoming(movie.release_date)}</span>
            </div>
        </div>
    )
}