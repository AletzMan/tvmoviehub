import { MovieIcon, NotIcon, PeopleIcon, SerieIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"

interface Props {
    type: 'movie' | 'tv' | 'people'
    id: string
}

export function NotResults({ type, id }: Props) {

    const messages = {
        movie: "películas",
        tv: "series",
        people: "personas"
    }

    return (
        <article className={styles.view}>
            <div className={styles.view_icons}>
                {type === "movie" && <MovieIcon className={styles.view_iconType} />}
                {type === "tv" && <SerieIcon className={styles.view_iconType} />}
                {type === "people" && <PeopleIcon className={styles.view_iconType} />}
                <NotIcon className={styles.view_icon} />
            </div>
            <p className={styles.view_message}>{`No se encontraron ${messages[type]} para el id: `}<span className={styles.view_id}>{id}</span></p>
            <p className={styles.view_messageTwo}>Verifique el ID y vuelva a intentarlo o busque por título.</p>
        </article>
    )
}