"use client"
import { MouseEvent } from "react"
import styles from "./button.module.scss"
import Link from "next/link"
import { TrilerIcon } from "@/app/utils/svg"
import { useVideo } from "@/app/services/store"
import { IMovieVideos } from "@/app/interfaces/movie"
import { GetVideosMovie, GetVideosSerie } from "@/app/services/fetchData"


interface Props {
    id: number
    type: 'movie' | 'tv'
}

export function ButtonTrailer({ id, type }: Props) {
    const { setVideoState, setVideoType, setID } = useVideo()

    function HandleView(event: MouseEvent<HTMLButtonElement>): void {
        setVideoState(true)
        setVideoType(type)
        setID(id)
    }

    return (
        <button className={`${styles.button}  `} onClick={HandleView}  >
            <TrilerIcon />
            Videos
        </button>
    )
}