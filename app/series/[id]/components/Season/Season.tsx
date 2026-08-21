"use client"

import Image from "next/image"
import {
    IEpisode,
    ISeason
} from "@/app/interfaces/serie"

import styles from "./season.module.scss"
import { BASE_URL_IMG } from "@/app/utils/const"
import { ComboBoxSession } from "@/app/components/ComboBoxSession/ComboBoxSession"
import {
    ChangeEvent,
    useEffect,
    useMemo,
    useState
} from "react"

import { GetSeasonDetails } from "@/app/services/fetchData"
import { ConvertMinutesToHours } from "@/app/utils/helpers"
import { TimeIcon } from "@/app/utils/svg"
import { Average } from "@/app/components/Average/Average"

interface Props {
    seasons: ISeason[]
    idSerie: number
    children?: React.ReactNode
}

export const Season = ({
    seasons,
    idSerie,
    children
}: Props) => {

    const validSeasons = useMemo(
        () =>
            seasons.filter(
                season =>
                    season.season_number !== 0 &&
                    season.episode_count > 0
            ),
        [seasons]
    )

    const [currentSeason, setCurrentSeason] =
        useState<ISeason>(validSeasons[0])

    const [currentEpisodes, setCurrentEpisodes] =
        useState<IEpisode[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getEpisodes = async () => {
            try {
                setLoading(true)

                const details = await GetSeasonDetails(
                    idSerie.toString(),
                    currentSeason.season_number
                )

                setCurrentEpisodes(details?.episodes ?? [])
            } finally {
                setLoading(false)
            }
        }

        getEpisodes()
    }, [idSerie, currentSeason])

    const handleChangeSeason = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const seasonNumber = Number(e.currentTarget.value)

        const selectedSeason = validSeasons.find(
            season =>
                season.season_number === seasonNumber
        )

        if (selectedSeason) {
            setCurrentSeason(selectedSeason)
        }
    }

    return (
        <section className={styles.section}>

            <header className={styles.section_header}>
                <div>
                    <span className={styles.section_eyebrow}>
                        Temporadas
                    </span>

                    <h2 className={styles.section_title}>
                        Explora los episodios
                    </h2>
                </div>

                <div className={styles.section_selector}>
                    <ComboBoxSession
                        number={validSeasons.length}
                        onChange={handleChangeSeason}
                    />
                </div>
            </header>

            <article className={styles.season}>
                <div className={styles.season_poster}>
                    <Image
                        src={
                            currentSeason.poster_path
                                ? `${BASE_URL_IMG}${currentSeason.poster_path}`
                                : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"
                        }
                        alt={currentSeason.name}
                        width={180}
                        height={270}
                    />
                </div>

                <div className={styles.season_content}>
                    <span className={styles.season_number}>
                        Temporada {currentSeason.season_number}
                    </span>

                    <h3 className={styles.season_name}>
                        {currentSeason.name}
                    </h3>

                    <div className={styles.season_meta}>
                        <span>
                            {currentSeason.episode_count}
                            {currentSeason.episode_count === 1
                                ? " episodio"
                                : " episodios"}
                        </span>

                        {currentSeason.air_date && (
                            <>
                                <span className={styles.season_dot}>
                                    •
                                </span>

                                <span>
                                    {new Date(
                                        currentSeason.air_date
                                    ).getFullYear()}
                                </span>
                            </>
                        )}
                    </div>

                    {currentSeason.overview && (
                        <p className={styles.season_overview}>
                            {currentSeason.overview}
                        </p>
                    )}

                    {children}
                </div>
            </article>

            <div className={styles.episodes_header}>
                <h3>Episodios</h3>

                {!loading && (
                    <span>
                        {currentEpisodes.length} disponibles
                    </span>
                )}
            </div>

            {loading ? (
                <div className={styles.episodes_loading}>
                    Cargando episodios...
                </div>
            ) : (
                <div className={styles.episodes}>
                    {currentEpisodes.map(episode => (
                        <EpisodeCard
                            key={episode.id}
                            episode={episode}
                        />
                    ))}
                </div>
            )}

        </section>
    )
}

const EpisodeCard = ({
    episode
}: {
    episode: IEpisode
}) => {
    return (
        <article className={styles.episode}>
            <div className={styles.episode_imageWrapper}>
                <Image
                    className={styles.episode_image}
                    src={
                        episode.still_path
                            ? `${BASE_URL_IMG}${episode.still_path}`
                            : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available_view.jpg"
                    }
                    alt={episode.name}
                    width={360}
                    height={200}
                />

                <span className={styles.episode_number}>
                    {String(
                        episode.episode_number
                    ).padStart(2, "0")}
                </span>
            </div>

            <div className={styles.episode_content}>
                <div className={styles.episode_heading}>
                    <h4>{episode.name}</h4>

                    <Average
                        average={episode.vote_average}
                    />
                </div>

                <div className={styles.episode_meta}>
                    {episode.runtime && (
                        <span>
                            <TimeIcon />
                            {ConvertMinutesToHours(
                                episode.runtime
                            )}
                        </span>
                    )}

                    {episode.air_date && (
                        <span>
                            {new Date(
                                episode.air_date
                            ).toLocaleDateString(
                                "es-MX",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )}
                        </span>
                    )}
                </div>

                {episode.overview && (
                    <p className={styles.episode_overview}>
                        {episode.overview}
                    </p>
                )}
            </div>
        </article>
    )
}