/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useVideo } from "@/app/services/store"
import styles from "./styles.module.scss"
import { useEffect, useState, MouseEvent } from "react"
import { Button } from "../Button/Button"
import Image from "next/image"
import { GetVideosMovie, GetVideosSerie } from "@/app/services/fetchData"
import { IMovieVideo, IMovieVideos } from "@/app/interfaces/movie"
import { FormattedDate, FormattedDateSearch, FormattedDateUpcoming } from "@/app/utils/helpers"
import { DateIcon, LoadingIcon, PlayIcon } from "@/app/utils/svg"
import { Video } from "./components/Video"


export function TrailerPage() {
    const { videoType, videoState, setVideoState, id, video, setVideo } = useVideo()
    const [typeVideo, setTypeVideo] = useState<'Trailer' | 'Teaser' | 'Featurette' | 'Behind the Scenes' | 'Clip'>("Trailer")
    const [videos, setVideos] = useState<IMovieVideo[] | null>(null)
    const [language, setLanguage] = useState<'en-US' | 'es-MX'>("en-US")




    useEffect(() => {
        GetVideo()
    }, [typeVideo, id, language])

    const GetVideo = async () => {
        let response: IMovieVideos | null
        if (videoType === "movie") {
            response = await GetVideosMovie(id, language)

        } else {
            response = await GetVideosSerie(id, language)

        }
        if (response) {
            const result = response.results.filter(movie => movie.type === typeVideo)
            setVideos(result)
        }
    }

    function HandleCloseVideo(event: MouseEvent<HTMLDialogElement>): void {
        if ((event.target as HTMLElement).tagName === "DIALOG") {
            setVideo("")
        }
    }


    return (
        <>
            {videoState &&
                <dialog className={styles.trailer} open>
                    <section className={styles.trailer_section}>
                        <header className={styles.header}>
                            <fieldset className={styles.header_language}>
                                <legend className={styles.legend}>Idioma</legend>
                                <Button mode="button" text="Ingles" isSecondary={language !== 'en-US'} onClick={() => setLanguage('en-US')} icon={<Image src="/use_flag.png" alt="Ingles" width={20} height={22}></Image>} />
                                <Button mode="button" text="Español" isSecondary={language !== 'es-MX'} onClick={() => setLanguage('es-MX')} icon={<Image src="/mexico_flag.png" alt="Español" width={20} height={20} ></Image>} />
                                <Button className={styles.header_close} mode="button" text="Cerrar" onClick={() => setVideoState(false)} />
                            </fieldset>
                            <fieldset className={styles.header_type}>
                                <legend className={styles.legend}>Tipo de vídeo</legend>
                                <Button mode="button" text="Trailer" isSecondary={typeVideo !== "Trailer"} onClick={() => setTypeVideo('Trailer')} />
                                <Button mode="button" text="Teaser" isSecondary={typeVideo !== "Teaser"} onClick={() => setTypeVideo('Teaser')} />
                                <Button mode="button" text="Detrás de cámaras" isSecondary={typeVideo !== "Behind the Scenes"} onClick={() => setTypeVideo('Behind the Scenes')} />
                                <Button mode="button" text="Reportaje" isSecondary={typeVideo !== "Featurette"} onClick={() => setTypeVideo('Featurette')} />
                                <Button mode="button" text="Clip" isSecondary={typeVideo !== "Clip"} onClick={() => setTypeVideo('Clip')} />
                            </fieldset>
                        </header>
                        <div className={`${styles.videos} scrollBarStyle`}>
                            {videos?.map(video => (
                                <Video key={video.id} video={video} />
                            ))
                            }
                            {videos?.length === 0 &&
                                <>
                                    <p className={styles.videos_message} >🎬 ¡Ups! Aún no hay videos disponibles.</p>
                                </>
                            }
                        </div>
                    </section>
                    {video &&
                        <dialog open className={styles.player} onClick={HandleCloseVideo}>
                            {<iframe className={styles.player_video} width="250" height="140"
                                src={`https://www.youtube.com/embed/${video}?si=_jniBBt_wZa3qy8V`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write;  gyroscope; picture-in-picture; web-share" allowFullScreen>
                            </iframe>}
                        </dialog>}
                </dialog>
            }
        </>
    )
}