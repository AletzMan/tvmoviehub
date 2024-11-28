"use client"
import { DateIcon, LoadingIcon, PlayIcon } from "@/app/utils/svg"
import Image from "next/image"
import styles from "./styles.module.scss"
import { FormattedDateSearch } from "@/app/utils/helpers"
import { ChangeEvent, useState } from "react"
import { useVideo } from "@/app/services/store"
import { IMovieVideo } from "@/app/interfaces/movie"

interface Props {
    video: IMovieVideo
}

export function Video({ video }: Props) {
    const [loading, setLoading] = useState(true)
    const { setVideo } = useVideo()
    const [errorImage, seErrorImage] = useState(false)
    const [pathImage, setPathImage] = useState(`https://i3.ytimg.com/vi/${video.key}/maxresdefault.jpg`)

    function HandleLoadVideo(e: ChangeEvent<HTMLImageElement>) {
        setLoading(false)
    }

    function HandleErrorLoadImage(event: ChangeEvent<HTMLImageElement>): void {
        setPathImage("https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/streamin-movie-clone/Image_not_available_view.jpg")
        setLoading(false)
    }

    return (
        <div key={video.id} className={styles.video} role="button" onClick={() => setVideo(video.key)}>
            {loading && <LoadingIcon className={styles.video_loading} />}
            <Image src={pathImage} width={180} height={100} onLoad={HandleLoadVideo} onError={HandleErrorLoadImage}
                alt={`Imagen de ${video.name}`} className={styles.video_image} />


            <footer className={styles.video_footer}>
                <span className={styles.video_name}>{video.name}</span>
                <span className={styles.video_date}><DateIcon />{FormattedDateSearch(video.published_at)}</span>
            </footer>
            <button className={styles.video_play}><PlayIcon /></button>
        </div>
    )
}