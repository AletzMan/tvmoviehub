import { IPeopleDetails, IPeopleImages } from "@/app/interfaces/people"
import styles from "./person.module.scss"
import { GetMoviesCredits, GetPersonDetails, GetSeriesCredits } from "@/app/services/fetchData"
import Image from "next/image"
import { BASE_URL_IMG, getAvailableSocialLinks, getDepartmentTranslation, SmallDateLocal } from "@/app/utils/const"
import { SliderPhotos } from "../components/SliderPhotos/SliderPhotos"
import { IMovieCredits, ISerieCredits } from "@/app/interfaces/credits"
import { MovieSliderCredits } from "@/app/components/MovieSlider/MovieSliderCredits"
import { SeriesSliderCredits } from "@/app/components/MovieSlider/SeriesSliderCredits"
import { ClapperboardIcon, DateIcon, FavoriteEmptyIcon, GlobeIcon, LocationIcon, MovieIcon, StarIcon } from "@/app/utils/svg"
import { FormattedDate, getCountryFromText } from "@/app/utils/helpers"
import { NotResults } from "@/app/components/NotResults/NotResults"
import { Icon } from "@iconify/react"
import { MovieSliderGeneral } from "@/app/components/MovieSlider/MovieSliderGeneral"
import { MovieCard } from "@/app/components/MovieCard/MovieCard"
import { IMovie } from "@/app/interfaces/movie"
import { PersonJobs } from "./PersonJobs"

const GetDetails = async (id: string): Promise<IPeopleDetails | null> => {
    const data = await GetPersonDetails(id, "ES")
    if (data?.biography !== "") {
        return data
    } else {
        return await GetPersonDetails(id, 'ES')
    }
}

export default async function Page(params: { params: Promise<{ id: string }>, searchParams: Promise<{}> }) {
    const details: IPeopleDetails | null = await GetDetails((await params.params).id)

    console.log(details)
    // Ordenar el reparto de mayor a menor popularidad
    const sortedCast = details?.movie_credits?.cast
        ?.slice() // Muy importante: crea una copia para no mutar el array original
        ?.sort((a, b) => b.popularity - a.popularity) || [];


    console.log("MAX: ", sortedCast)


    const socialLinks = getAvailableSocialLinks(details?.external_ids)

    const locationInfo = getCountryFromText(details?.place_of_birth || "");


    const totalCredits = (): string => {
        const total =
            (details?.movie_credits?.cast?.length ?? 0) +
            (details?.movie_credits?.crew?.length ?? 0) +
            (details?.tv_credits?.cast?.length ?? 0) +
            (details?.tv_credits?.crew?.length ?? 0);

        return `${total} en total`;
    };

    return (
        <section className={`${styles.section}  `}>
            {details ?
                <>
                    <article className={styles.people} >
                        <Image className={styles.people_backdrop} src={BASE_URL_IMG.concat(sortedCast[0].backdrop_path || "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg")} alt={`Foto de ${details.name}`} width={200} height={300} />

                        <Image className={styles.people_photo} src={BASE_URL_IMG.concat(details.profile_path || "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg")} alt={`Foto de ${details.name}`} width={200} height={300} />
                        <div className={styles.people_description}>
                            <h2 className={styles.people_name}>{details.name}</h2>
                            {/* <div className={styles.people_knownames}>
                                { details.also_known_as.map((name, index) => (
                                    <span key={name} className={styles.people_knowname}>{name} {index !== details.also_known_as.length - 1 ? "•" : null} </span>
                                ))
                               }
                            </div> */ }
                            <div className={styles.people_country}>
                                <span>{locationInfo?.country}</span>
                                <img src={locationInfo?.flag} />
                            </div>

                            <p className={`${styles.people_biography} `}>{details.biography.split("\n")[0]}</p>

                        </div>
                        <div className={styles.data}>
                            <div className={styles.data_option}>
                                <div className={styles.data_label}><DateIcon />Fecha de nacimiento</div>
                                {<span className={styles.data_description}>{FormattedDate(details.birthday, "long")}</span>}
                            </div>
                            <div className={styles.data_option}>
                                <div className={styles.data_label}><LocationIcon />Lugar de nacimiento</div>
                                {<span className={styles.data_description}>{details.place_of_birth}</span>}
                            </div>
                            <div className={styles.data_option}>
                                <div className={styles.data_label}><FavoriteEmptyIcon />Conocido por</div>
                                {<span className={styles.data_description}>{getDepartmentTranslation(details.known_for_department, details.gender)}</span>}
                            </div>
                            <div className={styles.data_option}>
                                <div className={styles.data_label}><ClapperboardIcon />Créditos</div>
                                {<span className={styles.data_description}>{totalCredits()}</span>}
                            </div>
                            <div className={styles.data_option}>
                                <div className={styles.data_label}><GlobeIcon />Redes sociales</div>
                                <div className={styles.data_links}>
                                    {socialLinks?.map((link, index) => (
                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                            <Icon icon={link.icon} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                    {/*<SliderPhotos id_people={(await params.params).id} name_people={details.name} />*/}


                    {(details.movie_credits && sortedCast.length > 0) &&
                        <MovieSliderGeneral title="Conocido por" slidesToShow={6}  >
                            <>
                                {
                                    sortedCast?.filter((_, index) => index < 6).map((serie) => (
                                        <MovieCard key={serie.id} movie={serie as IMovie} aspectRatio="16/16" />
                                    ))
                                }
                            </>
                        </MovieSliderGeneral>
                    }
                    <PersonJobs moviesCast={details.movie_credits.cast} />
                    {/*(details.movie_credits && details.movie_credits.cast.length > 0) && <MovieSliderCredits parts={details.movie_credits.cast} title="Reparto" type="movie" />*/}
                    {/*(details.movie_credits && details.movie_credits.crew.length > 0) && <MovieSliderCredits parts={details.movie_credits.crew} title="Detrás de cámaras" type="movie" />*/}

                    {/*(details.tv_credits && details.tv_credits?.crew?.length > 0 || details.tv_credits && details.tv_credits?.cast?.length > 0) &&
                        <div className={styles.header}>
                            <MovieIcon className={styles.header_icon} />
                            <h4 className={styles.header_title}>Series de {details.name}</h4>
                        </div>
                    */}
                    {/*(details.tv_credits && details.tv_credits?.cast.length > 0) && <SeriesSliderCredits parts={details.tv_credits.cast} type="tv" title="Reparto" />*/}
                    {/*(details.tv_credits && details.tv_credits?.crew.length > 0) && <SeriesSliderCredits parts={details.tv_credits.crew} type="tv" title="Detrás de cámaras" />*/}
                </>
                :
                <NotResults type="people" id={(await params.params).id} />
            }
        </section>
    );
}

