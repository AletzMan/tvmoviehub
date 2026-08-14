import { IParticipationsCast, IParticipationsCrew, ISeriesCast } from "@/app/interfaces/credits"
import styles from "./person.module.scss"
import { BASE_URL_IMG_CUSTOM, getDepartmentTranslation } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/iconify"
import { getScoreColor } from "@/app/utils/helpers"
import Link from "next/link"

type CreditData = IParticipationsCast | IParticipationsCrew | ISeriesCast

interface Props {
    cast?: CreditData
    crew?: CreditData
}

export const MovieViewCard = ({ cast, crew }: Props) => {

    const data = cast || crew
    if (!data) return null

    const year = "release_date" in data
        ? data.release_date?.split("-")[0] ?? "--"
        : "first_air_date" in data
            ? data.first_air_date?.split("-")[0] ?? "--"
            : "--"

    const posterPath = data.poster_path
    const title = "title" in data ? data.title : "name" in data ? data.name : "--"
    const job = "character" in data && data.character
        ? data.character
        : "department" in data
            ? getDepartmentTranslation(data.department || "")
            : "job" in data && data.job
                ? data.job
                : ""
    const voteAverage = data.vote_average

    return (
        <Link className={styles.card} href={`/movies/${data.id}`}>
            <picture className={styles.card_picture}>
                <img
                    className={styles.card_poster}
                    src={
                        posterPath
                            ? `${BASE_URL_IMG_CUSTOM}/w200${posterPath}`
                            : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"
                    }
                    alt={`Poster de ${title}`}
                    loading="lazy"
                />
            </picture>

            <div className={styles.card_content}>
                <h2 className={styles.card_title}>
                    {title}
                </h2>

                <div className={styles.card_meta}>
                    <span>{year}</span>

                    {job && (
                        <>
                            <span className={styles.card_separator}>•</span>
                            <span className={styles.card_character}>
                                {job}
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.card_right}>
                <div
                    className={styles.card_average}
                    style={{
                        color: getScoreColor(
                            Number(voteAverage?.toFixed(1)) || 0
                        )
                    }}
                >
                    <StarIcon />
                    <span>{voteAverage?.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    )
}