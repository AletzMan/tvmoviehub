import { IListMovie } from "@/app/interfaces/list"
import styles from "./styles.module.scss"
import { FolderMovieIcon } from "@/app/utils/svg"
import Link from "next/link"

interface Props {
    list: IListMovie
}

export function ListCard({ list }: Props) {


    return (
        <Link className={styles.listCard} href={`/lists/details/${list.id}?page=1`}>
            <h3 className={styles.listCard_title}>{list.name}</h3>
            <span className={styles.listCard_count}>{list.item_count}<span className={styles.listCard_countText}>Elementos</span></span>
            <p className={styles.listCard_description}>{list.description}</p>
            <FolderMovieIcon className={styles.listCard_icon} />
        </Link>
    )
}