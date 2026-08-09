"use client"
import styles from "./styles.module.scss"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BASE_URL_IMG, URL_IMAGE_NOTCOVER } from "@/app/utils/const"
import { StarIcon, DeleteIcon } from "@/app/utils/svg"
import { IListItem } from "@/app/interfaces/list"
import { useState, useRef, PointerEvent } from "react"
import { useDialogAlert, useLoadingState } from "@/app/services/store"

interface Props {
    movie: IListItem
    list_id: number
}

export function MovieCardList({ movie, list_id }: Props) {
    const router = useRouter()
    const { setLoadingState } = useLoadingState()
    const { viewDialog, setViewDialog, setItemToDelete, setTypeDialog } = useDialogAlert()
    const [load, setLoad] = useState(true)

    const pointerPos = useRef({ x: 0, y: 0 })
    const isDraggingRef = useRef(false)

    const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
        pointerPos.current = { x: e.clientX, y: e.clientY }
        isDraggingRef.current = false
    }

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const dx = Math.abs(e.clientX - pointerPos.current.x)
        const dy = Math.abs(e.clientY - pointerPos.current.y)

        if (dx > 5 || dy > 5) {
            isDraggingRef.current = true
        }
    }

    const handleCardClick = () => {
        if (isDraggingRef.current) return

        setLoadingState(true)
        router.push(movie.media_type === "tv" ? `/series/${movie.id}` : `/movies/${movie.id}`)
    }

    const handleLoadImage = () => {
        setLoad(false)
    }

    const handleDeleteItem = async () => {
        setViewDialog(true)
        setTypeDialog("item")
        setItemToDelete({ id: movie.id, list_id, name_item: movie.name || movie.title, name_list: "", text: ["¿Desea eliminar el elemento de la lista?", ""] })
    }

    return (
        <div
            className={styles.movie}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClick={handleCardClick}
        >
            <div className={styles.movie_posterWrapper}>
                <Image
                    className={styles.movie_poster}
                    onLoad={handleLoadImage}
                    src={movie.poster_path ? BASE_URL_IMG.concat(`${movie.poster_path}`) : URL_IMAGE_NOTCOVER}
                    width={200}
                    height={300}
                    alt={`Poster de ${movie.title || movie.name}`}
                    draggable={false}
                />
                <div className={styles.movie_overlay}></div>
            </div>

            <div className={styles.movie_footer}>
                <div>
                    <h4 className={styles.movie_title} title={movie.title || movie.name}>{movie.title || movie.name}</h4>
                    <div className={styles.movie_meta}>
                        <span className={styles.movie_year}>
                            {(movie?.release_date || movie?.first_air_date) ? new Date(movie?.release_date || movie?.first_air_date || "").getFullYear() : "N/A"}
                        </span>
                        <div className={styles.movie_average}>
                            <StarIcon className={styles.movie_icon} />
                            <span>{movie?.vote_average?.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.movie_actions}>
                    <button
                        className={styles.delete}
                        title="Eliminar de la lista"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteItem()
                        }}
                    >
                        <DeleteIcon className={styles.delete_icon} />
                    </button>
                </div>
            </div>
        </div>
    )
}