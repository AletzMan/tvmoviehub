import { IParticipationsCast } from "@/app/interfaces/credits"
import styles from "./person.module.scss"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/iconify"
import { getScoreColor } from "@/app/utils/helpers"
import { MediaOptions } from "@/app/components/MediaOptions/MediaOptions"

interface Props {
    movie: IParticipationsCast
}

export const MovieViewCard = ({ movie }: Props) => {

    const overview = movie.overview.split(".")[0]

    return (
        <div key={movie.id} className={styles.card}>
            <picture className={styles.card_picture}>
                <img
                    className={styles.card_poster}
                    src={movie.poster_path !== null ? BASE_URL_IMG_CUSTOM.concat(`/w200`.concat(movie.poster_path || "")) : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"}
                    alt={`Imagen de perfil de ${movie.title}`} />
            </picture>
            <div className={styles.card_content}>
                <div>
                    <h2 className={styles.card_title}>{movie.title}</h2>
                    <span className={styles.card_age}>{movie.release_date.split("-")[0]}</span>
                </div>
                {overview && <p className={styles.card_overview}>{overview}.</p>}
            </div>
            <div className={styles.card_actions}>
                <div className={styles.card_average} style={{ color: getScoreColor(Number(movie.vote_average.toFixed(1)) || 0) }}>
                    <StarIcon />
                    <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <MediaOptions title={movie.title} type="movie" id={movie.id} />
            </div>
        </div>
    )
}