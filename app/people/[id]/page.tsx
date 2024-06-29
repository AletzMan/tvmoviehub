import { IPeopleDetails, IPeopleImages } from "@/app/interfaces/people"
import styles from "./person.module.scss"
import { GetMoviesCredits, GetPersonDetails, GetSeriesCredits } from "@/app/services/fetchData"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { SliderPhotos } from "../components/SliderPhotos/SliderPhotos"
import { IMovieCredits, ISerieCredits } from "@/app/interfaces/credits"
import { MovieSliderCredits } from "@/app/components/MovieSlider/MovieSliderCredits"
import { SeriesSliderCredits } from "@/app/components/MovieSlider/SeriesSliderCredits"
import { MovieIcon } from "@/app/utils/svg"
import { FormattedDate } from "@/app/utils/helpers"

const GetDetails = async (id: string): Promise<IPeopleDetails> => {
    const data = await GetPersonDetails(id, "ES")
    if (data.biography !== "") {
        return data
    } else {
        return await GetPersonDetails(id, 'EN')
    }
}

export default async function Page(params: { params: { id: string }, searchParams: {} }) {
    const details: IPeopleDetails = await GetDetails(params.params.id)
    const movieCredits: IMovieCredits = await GetMoviesCredits(params.params.id)
    const seriesCredits: ISerieCredits = await GetSeriesCredits(params.params.id)


    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <article className={styles.people}>
                <Image className={styles.people_photo} src={BASE_URL_IMG.concat(details.profile_path || "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg")} alt={`Foto de ${details.name}`} width={200} height={300} />
                <div className={styles.people_description}>
                    <span className={styles.people_name}>{details.name}</span>
                    {details.deathday && <span className={styles.people_birthday}>{FormattedDate(details.birthday, "small")}</span>}
                    <span className={styles.people_place}>{details.place_of_birth}</span>
                    <div className="separator"></div>
                    {details.biography.split("\n").map(paragraph => (
                        <p key={paragraph} className={`${styles.people_biography} ${paragraph.length < 30 && styles.people_title}`}>{paragraph}</p>
                    ))

                    }
                </div>
            </article>
            <SliderPhotos id_people={params.params.id} name_people={details.name} />
            <div className="separator"></div>
            {(movieCredits.cast.length > 0 || movieCredits.crew.length > 0) &&
                <div className={styles.header}>
                    <MovieIcon className={styles.header_icon} />
                    <h4 className={styles.header_title}>Películas de {details.name}</h4>
                </div>
            }
            {movieCredits.cast.length > 0 && <MovieSliderCredits parts={movieCredits.cast} title="Reparto" type="movie" />}
            {movieCredits.crew.length > 0 && <MovieSliderCredits parts={movieCredits.crew} title="Detrás de cámaras" type="movie" />}
            <div className="separator"></div>
            {(seriesCredits && seriesCredits?.crew?.length > 0 || seriesCredits?.cast?.length > 0) &&
                <div className={styles.header}>
                    <MovieIcon className={styles.header_icon} />
                    <h4 className={styles.header_title}>Series de {details.name}</h4>
                </div>
            }
            {seriesCredits?.cast.length > 0 && <SeriesSliderCredits parts={seriesCredits.cast} type="tv" title="Reparto" />}
            {seriesCredits?.crew.length > 0 && <SeriesSliderCredits parts={seriesCredits.crew} type="tv" title="Detrás de cámaras" />}
        </section>
    )
}

