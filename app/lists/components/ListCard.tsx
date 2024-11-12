import { IListMovie } from "@/app/interfaces/list"
import styles from "./styles.module.scss"

interface Props {
    list: IListMovie
}

export function ListCard({ list }: Props) {


    return (
        <article className={styles.listCard}>
            <h3 className={styles.listCard_title}>{list.name}</h3>
            <span className={styles.listCard_count}>{list.item_count}<span className={styles.listCard_countText}>Películas</span></span>
            <p className={styles.listCard_description}>{list.description}</p>
        </article>
    )
}