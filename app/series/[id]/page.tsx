import styles from "./detailseries.module.scss"
import Image from "next/image"

import {
    BASE_URL_IMG,
    countryFlags
} from "@/app/utils/const"

import {
    ConvertMinutesToHours
} from "@/app/utils/helpers"

import {
    GetSerieDetails,
    GetSerieCredits,
    GetSerieRecommendations,
    GetSeriesImages,
    GetSeriesKeywords,
    GetWatchProviders
} from "@/app/services/fetchData"

import { SliderCrew } from "@/app/movies/[id]/components/SliderCrew/SliderCrew"
import { MovieSlider } from "@/app/components/MovieSlider/MovieSlider"
import { Season } from "./components/Season/Season"
import { NotResults } from "@/app/components/NotResults/NotResults"
import { SectionImages } from "@/app/movies/[id]/components/SectionImages/SectionImages"
import { SectionTags } from "@/app/movies/[id]/components/SectionTags/SectionTags"
import { FavoriteButton } from "@/app/components/FavoriteButton/FavoriteButton"
import { ButtonTrailer } from "@/app/components/ButtonTrailer/ButtonTrailer"
import { WatchProviders } from "@/app/movies/[id]/components/WatchProviders/WatchProviders"

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const [
        details,
        credits,
        recommendation,
        images,
        keywords,
        providers
    ] = await Promise.all([
        GetSerieDetails(id),
        GetSerieCredits(id),
        GetSerieRecommendations(id),
        GetSeriesImages(id),
        GetSeriesKeywords(id),
        GetWatchProviders(id, "tv")
    ])

    if (!details) {
        return (
            <NotResults
                type="tv"
                id={id}
            />
        )
    }

    const country = countryFlags.find(
        country =>
            country.code === details.origin_country?.[0]
    )

    const firstYear = details.first_air_date
        ? new Date(details.first_air_date).getFullYear()
        : null

    const lastYear = details.last_air_date
        ? new Date(details.last_air_date).getFullYear()
        : null

    const runtime =
        details.episode_run_time?.[0] ?? null

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <section className={styles.hero}>

                {details.backdrop_path && (
                    <div className={styles.hero_backdrop}>
                        <Image
                            src={`${BASE_URL_IMG}${details.backdrop_path}`}
                            alt=""
                            fill
                            priority
                            className={styles.hero_backdropImage}
                        />
                    </div>
                )}

                <div className={styles.hero_poster}>
                    <Image
                        src={`${BASE_URL_IMG}${details.poster_path}`}
                        alt={`Poster de ${details.name}`}
                        width={360}
                        height={540}
                        priority
                        className={styles.hero_posterImage}
                    />
                </div>

                <div className={styles.hero_content}>

                    <div className={styles.hero_heading}>
                        <h1>{details.name}</h1>

                        {details.original_name !== details.name && (
                            <span>
                                {details.original_name}
                            </span>
                        )}
                    </div>

                    <div className={styles.hero_meta}>

                        {firstYear && (
                            <span>
                                {firstYear}
                                {lastYear && lastYear !== firstYear
                                    ? `–${lastYear}`
                                    : ""}
                            </span>
                        )}

                        {runtime && (
                            <>
                                <span className={styles.hero_dot}>
                                    •
                                </span>

                                <span>
                                    {ConvertMinutesToHours(runtime)}
                                </span>
                            </>
                        )}

                        {details.number_of_seasons > 0 && (
                            <>
                                <span className={styles.hero_dot}>
                                    •
                                </span>

                                <span>
                                    {details.number_of_seasons}
                                    {details.number_of_seasons === 1
                                        ? " temporada"
                                        : " temporadas"}
                                </span>
                            </>
                        )}

                        <span className={styles.hero_dot}>
                            •
                        </span>

                        <div className={styles.hero_genres}>
                            {details.genres
                                ?.slice(0, 3)
                                .map(genre => (
                                    <span key={genre.id}>
                                        {genre.name}
                                    </span>
                                ))}
                        </div>

                        {country && (
                            <>
                                <span className={styles.hero_dot}>
                                    •
                                </span>

                                <div className={styles.hero_country}>
                                    <Image
                                        src={country.flag}
                                        width={22}
                                        height={14}
                                        alt=""
                                    />

                                    <span>
                                        {country.country}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.hero_rating}>
                        <div className={styles.rating_score}>
                            <span className={styles.rating_star}>
                                ★
                            </span>

                            <strong>
                                {details.vote_average.toFixed(1)}
                            </strong>

                            <span>/10</span>
                        </div>

                        <span className={styles.rating_votes}>
                            {details.vote_count.toLocaleString("es-MX")} votos
                        </span>

                        {details.status && (
                            <span className={styles.hero_status}>
                                {details.status}
                            </span>
                        )}
                    </div>

                    {details.tagline && (
                        <p className={styles.hero_tagline}>
                            {details.tagline}
                        </p>
                    )}

                    {details.overview && (
                        <p className={styles.hero_overview}>
                            {details.overview}
                        </p>
                    )}

                    <div className={styles.hero_actions}>
                        <ButtonTrailer
                            id={details.id}
                            type="tv"
                        />

                        <FavoriteButton
                            id={details.id}
                            title={details.name}
                            type="tv"
                        />
                    </div>
                </div>

                <aside className={styles.hero_side}>
                    {details.created_by?.length > 0 && (
                        <div className={styles.hero_sideGroup}>
                            <span className={styles.hero_sideLabel}>
                                Creada por
                            </span>

                            <div className={styles.hero_sideValue}>
                                {details.created_by
                                    .map(person => person.name)
                                    .join(", ")}
                            </div>
                        </div>
                    )}

                    {details.networks?.length > 0 && (
                        <div className={styles.hero_sideGroup}>
                            <span className={styles.hero_sideLabel}>
                                Cadena
                            </span>

                            <div className={styles.networks}>
                                {details.networks
                                    .slice(0, 3)
                                    .map(network => (
                                        <div
                                            key={network.id}
                                            className={styles.network}
                                        >
                                            {network.logo_path && (
                                                <Image
                                                    src={`${BASE_URL_IMG}${network.logo_path}`}
                                                    width={70}
                                                    height={35}
                                                    alt={network.name}
                                                />
                                            )}

                                            <span>
                                                {network.name}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.hero_sideDivider} />

                    <div className={styles.hero_stats}>
                        <div>
                            <span>Temporadas</span>
                            <strong>
                                {details.number_of_seasons}
                            </strong>
                        </div>

                        <div>
                            <span>Episodios</span>
                            <strong>
                                {details.number_of_episodes}
                            </strong>
                        </div>
                    </div>
                </aside>
            </section>

            <section className={styles.content}>
                <main className={styles.content_main}>

                    {details.seasons?.length > 0 && (
                        <section className={styles.block}>
                            <header className={styles.block_header}>
                                <div>
                                    <h2>Temporadas</h2>

                                    <span>
                                        {details.number_of_seasons} temporadas ·{" "}
                                        {details.number_of_episodes} episodios
                                    </span>
                                </div>
                            </header>

                            <Season
                                seasons={details.seasons}
                                idSerie={details.id}
                                children={<></>}
                            />
                        </section>
                    )}

                    {credits && credits!.cast!.length > 0 && (
                        <section className={styles.block}>
                            <header className={styles.block_header}>
                                <h2>Reparto principal</h2>
                            </header>

                            <SliderCrew
                                credits={credits}
                                type="cast"
                                title=""
                            />
                        </section>
                    )}

                    {images && (
                        <SectionImages
                            images={images}
                            id={details.id}
                            type="tv"
                        />
                    )}

                    {recommendation!.results!.length > 0 && (
                        <MovieSlider
                            parts={recommendation!.results}
                            title="RECOMENDACIONES PARA TI"
                        />
                    )}
                </main>

                <aside className={styles.content_sidebar}>

                    <WatchProviders
                        providers={providers}
                    />

                    {keywords && (
                        <section className={styles.sideBlock}>
                            <h3>Palabras clave</h3>

                            <SectionTags
                                keywords={keywords}
                            />
                        </section>
                    )}

                    {details.production_companies?.length > 0 && (
                        <section className={styles.sideBlock}>
                            <h3>Productoras</h3>

                            <div className={styles.companies}>
                                {details.production_companies
                                    .filter(company => company.logo_path)
                                    .slice(0, 4)
                                    .map(company => (
                                        <div
                                            key={company.id}
                                            className={styles.company}
                                        >
                                            <Image
                                                src={`${BASE_URL_IMG}${company.logo_path}`}
                                                width={80}
                                                height={35}
                                                alt={company.name}
                                            />

                                            <span>
                                                {company.name}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    )}
                </aside>
            </section>
        </section>
    )
}