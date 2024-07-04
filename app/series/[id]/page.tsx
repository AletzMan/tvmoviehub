
import styles from "./detailseries.module.scss"
import Image from "next/image"
import { BASE_URL_IMG, countryFlags } from "@/app/utils/const"
import { ConvertMinutesToHours } from "@/app/utils/helpers"
import { DateIcon, TimeIcon, TrilerIcon } from "@/app/utils/svg"
import { ICredits } from "@/app/interfaces/credits"
import { MovieSlider } from "@/app/components/MovieSlider/MovieSlider"
import { IRecommendationResponse } from "@/app/interfaces/responses"
import { GetSerieCredits, GetSerieDetails, GetSerieRecommendations, GetSeriesImages, GetSeriesKeywords } from "@/app/services/fetchData"
import { SliderCrew } from "@/app/movies/[id]/components/SliderCrew/SliderCrew"
import { ISerieDetails } from "@/app/interfaces/serie"
import { Season } from "./components/Season/Season"
import { Crew } from "@/app/components/Crew/Crew"
import { NotResults } from "@/app/components/NotResults/NotResults"
import { IImages } from "@/app/interfaces/image"
import { SectionImages } from "@/app/movies/[id]/components/SectionImages/SectionImages"
import { IKeywords } from "@/app/interfaces/keyword"
import Link from "next/link"
import { SectionTags } from "@/app/movies/[id]/components/SectionTags/SectionTags"

export default async function Page(params: { params: { id: string }, searchParams: {} }) {

    const details: ISerieDetails | null = await GetSerieDetails(params.params.id)

    const credits: ICredits | null = await GetSerieCredits(params.params.id)

    const recommendation: IRecommendationResponse | null = await GetSerieRecommendations(params.params.id)

    const images: IImages | null = await GetSeriesImages(params.params.id)

    const keywords: IKeywords | null = await GetSeriesKeywords(params.params.id)



    return (
        <section className={`${styles.section} scrollBarStyle`}>
            {details ?
                <>
                    <article className={styles.movie}>
                        <Image className={styles.movie_image} src={BASE_URL_IMG.concat(details.backdrop_path)} alt={`Imagen de fondo de ${details.name}`} width={1150} height={700} />
                        <div className={styles.movie_shadow}></div>
                        <div className={styles.movie_header}>
                            <h2 className={styles.movie_title}>{details.name}</h2>
                            <h3 className={styles.movie_subtitle}>{`(${details.original_name})`}</h3>
                            {details?.origin_country?.length > 0 && <div className={styles.movie_country}>
                                <Image className={styles.movie_countryFlag} src={countryFlags.find(country => country.code === details.origin_country[0])?.flag || ""} width={26} height={16} alt="" />
                                <span className={styles.movie_countryName}>{countryFlags.find(country => country.code === details.origin_country[0])?.country}</span>
                            </div>
                            }
                        </div>
                        <div className={styles.movie_details}>
                            <Image className={styles.movie_poster} src={BASE_URL_IMG.concat(details.poster_path)} alt={`Imagen de fondo de ${details.name}`} width={150} height={220} />
                            <div className={styles.movie_info} >
                                <p className={styles.movie_tagline}>{details.tagline}</p>
                                <div className={styles.movie_genres}>
                                    {
                                        details?.genres?.map(genre => (
                                            <span key={genre.id} className={styles.movie_genre}>{genre.name}</span>
                                        ))
                                    }
                                </div>

                                <div className={styles.movie_timeYear}>
                                    {details?.episode_run_time?.length > 0 && <span className={styles.movie_runtime}><TimeIcon className={styles.movie_icon} />{ConvertMinutesToHours(details.episode_run_time[0])}</span>}
                                    <p className={styles.movie_year}><DateIcon className={styles.movie_iconDate} />{new Date(details.first_air_date).getFullYear()}</p>
                                    {/*<Average average={details.vote_average} />*/}
                                </div>
                                <button className={styles.movie_play}>
                                    <TrilerIcon className={styles.movie_playIcon} />
                                    <span className={styles.movie_playText}>Ver tráiler</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    <div className={styles.movie_companies}>
                        {
                            details?.production_companies?.filter(company => company.logo_path !== null).map(company => (
                                <div className={styles.movie_company} key={company.id} >
                                    <Image className={styles.movie_companyLogo} src={BASE_URL_IMG.concat(company.logo_path || "")} width={60} height={40} alt={company.name} />
                                    <span className={styles.movie_companyName}>{company.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    {images && <SectionImages images={images} />}
                    {keywords && <SectionTags keywords={keywords} />}
                    <Season seasons={details.seasons} idSerie={details.id} >
                        <>
                            {details.overview !== "" &&
                                <>
                                    <h4 className={styles.details_title}>SINOPSIS</h4>
                                    <article className={styles.details}>
                                        <p className={styles.details_overview}>{details.overview}</p>
                                    </article>
                                </>
                            }
                        </>
                    </Season>
                    {details?.created_by?.length > 0 && <SliderCrew created_by={details.created_by} type="cast" title="CREADA POR" />}
                    {(credits && credits?.cast?.length > 0) && <SliderCrew credits={credits} type="cast" title="REPARTO" />}
                    {credits && <Crew credits={credits} />}
                    <hr className="separator" />
                    {recommendation && <MovieSlider parts={recommendation.results} title="RECOMENDACIONES" />}
                </>
                :
                <NotResults type="tv" id={params.params.id} />
            }
        </section>
    )
}