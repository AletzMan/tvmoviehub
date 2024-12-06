import { IListMovie } from "@/app/interfaces/list"
import styles from "./styles.module.scss"
import { FolderMovieIcon } from "@/app/utils/svg"
import Link from "next/link"
import Image from "next/image"
import { GetDetailsList } from "@/app/services/fetchData"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"

interface Props {
    list: IListMovie
}

export async function ListCard({ list }: Props) {
    const image = await GetDetailsList(list.id.toString(), 1)
    console.log(image)

    return (
        <Link className={styles.listCard} href={`/lists/details/${list.id}?page=1`}>
            <h3 className={styles.listCard_title}>{list.name}</h3>
            <span className={styles.listCard_count}>{list.item_count}<span className={styles.listCard_countText}>Elementos</span></span>
            <p className={styles.listCard_description}>{list.description}</p>
            <FolderMovieIcon className={styles.listCard_icon} />
            <Image className={styles.listCard_image} src={image?.items[0]?.backdrop_path ? BASE_URL_IMG_CUSTOM.concat(`/w300`.concat(image?.items[0]?.backdrop_path || "")) : 'https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/film_data_hub/backdrop_list.webp'} alt="Imagen de lista" width={320} height={160} />
        </Link>
    )
}