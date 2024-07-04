import Image from "next/image"
import Link from "next/link"
import styles from "./moviecard.module.scss"
import { AddIcon, FavoriteFullIcon, MovieIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { IMovie } from "@/app/interfaces/movie"

interface Props {
    movie: IMovie
    top: number
}

export const MovieCard = ({ movie, top }: Props) => {
    return (
        <div key={movie.id} className={styles.movie}>
            <Image className={styles.movie_backdrop} src={movie.poster_path ? BASE_URL_IMG.concat(movie.backdrop_path || '') : "/not_photo.png"} width={150} height={230} alt={`Poster de ${movie.title}`} />
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(movie.poster_path)) : "/not_photo.png"} width={150} height={230} alt={`Poster de ${movie.title}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={`/movies/${movie.id}`} title={movie.title}>
                    <AddIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            {<span className={styles.movie_number}>{top}</span>}
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie.vote_average.toFixed(1)}</span>
            <button className={styles.movie_fav}><FavoriteFullIcon className={styles.movie_favIcon} /> </button>
            <div className={styles.movie_description}>
                {/*<span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>*/}

                <span className={styles.movie_name}>{movie.title}</span>
                <span className={styles.movie_age}>{new Date(movie.release_date).getFullYear()}</span>
            </div>
        </div>
    )
}