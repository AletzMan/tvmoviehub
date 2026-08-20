"use client"

import { IListMovie } from "@/app/interfaces/list"
import styles from "./styles.module.scss"
import { ArrowRightIcon } from "@/app/utils/svg"
import Link from "next/link"
import { GetDetailsList } from "@/app/services/fetchData"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { ButtonDeleteList } from "./ButtonDeleteList"
import { useDragPreventClick } from "@/app/hooks/useDragPreventClick"
import { useEffect, useState } from "react"

interface Props {
    list: IListMovie
    color: string
}

export function ListCard({ list, color }: Props) {
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
            style={{
                "--list-color": color
            } as React.CSSProperties}
        >
            <ButtonDeleteList list={list} />
            <div className={styles.listCard_info}>
                <h1
                    className={styles.listCard_title}
                >
                    {list.name}
                </h1>
                <p className={styles.listCard_description}>{list.description}</p>
            </div>
            <footer>
                <div className={styles.listCard_container}>
                    <span className={styles.listCard_count}>{list.item_count}<span className={styles.listCard_countText}>Títulos</span></span>
                </div>
                <Link
                    className={styles.listCard_link}
                    href={`/lists/details/${list.id}?page=1`}
                    title="Ir a detalles de la lista"
                    onClick={handleClick()}
                >
                    <ArrowRightIcon />
                </Link>
            </footer>
        </div>
    )
}