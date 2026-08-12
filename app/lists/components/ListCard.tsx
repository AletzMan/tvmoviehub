"use client"

import { IListMovie } from "@/app/interfaces/list"
import styles from "./styles.module.scss"
import { FolderMovieIcon } from "@/app/utils/svg"
import Link from "next/link"
import Image from "next/image"
import { GetDetailsList } from "@/app/services/fetchData"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { ButtonDeleteList } from "./ButtonDeleteList"
import { useDragPreventClick } from "@/app/hooks/useDragPreventClick"
import { useEffect, useState } from "react"

interface Props {
    list: IListMovie
}

export function ListCard({ list }: Props) {
    const [image, setImage] = useState<any>(null)
    const { handlePointerDown, handlePointerMove, handleClick } = useDragPreventClick()

    useEffect(() => {
        GetDetailsList(list.id.toString(), 1).then(setImage)
    }, [list.id])

    const imageUrl = image?.items[0]?.backdrop_path 
        ? BASE_URL_IMG_CUSTOM.concat(`/w300`.concat(image?.items[0]?.backdrop_path || "")) 
        : 'https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/film_data_hub/backdrop_list.webp'

    return (
        <div 
            className={styles.listCard}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            <ButtonDeleteList list={list} />
            <Link 
                className={styles.listCard_title} 
                href={`/lists/details/${list.id}?page=1`} 
                title="Ir a detalles de la lista"
                onClick={handleClick()}
            >
                {list.name}
            </Link>
            <span className={styles.listCard_count}>{list.item_count}<span className={styles.listCard_countText}>Elementos</span></span>
            <p className={styles.listCard_description}>{list.description}</p>
            <FolderMovieIcon className={styles.listCard_icon} />
            <Image className={styles.listCard_image} src={imageUrl} alt="Imagen de lista" width={320} height={160} />
        </div>
    )
}