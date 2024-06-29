import styles from "./moviecarddetails.module.scss"
import Link from "next/link"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { AddIcon, FavoriteFullIcon, MovieIcon, SerieIcon, StarIcon } from "@/app/utils/svg"
import { IPartCollection } from "@/app/interfaces/movie"

interface Props {
    movie: IPartCollection
}

export function MovieCardDetails({ movie }: Props) {

    return (
        <div key={movie.id} className={styles.movie}>
            <div className={styles.movie_picture}>
                <Image className={styles.movie_photo} src={movie.poster_path ? BASE_URL_IMG.concat(movie.poster_path || '') : "/not_photo.png"} width={150} height={200} alt={`Poster de ${movie.title}`} />
            </div>
            <div className={styles.movie_shadow}></div>
            <div className={styles.movie_dialog}>
                <Link className={styles.movie_dialogMore} href={movie.media_type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`} title={movie.title}>
                    <AddIcon className={styles.movie_dialogIcon} />
                </Link>
            </div>
            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{movie.vote_average.toFixed(1)}</span>
            <button className={styles.movie_fav}><FavoriteFullIcon className={styles.movie_favIcon} /> </button>
            <div className={styles.movie_description}>
                {movie.media_type && movie.media_type === "movie" && <span className={styles.movie_type}><MovieIcon className={styles.movie_typeIcon} />Película</span>}
                {movie.media_type && movie.media_type === "tv" && <span className={styles.movie_type}><SerieIcon className={styles.movie_typeIcon} />Serie</span>}
                <span className={styles.movie_name}>{movie.title || movie.name}</span>
                <span className={styles.movie_age}>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
            </div>
        </div>
    )
}