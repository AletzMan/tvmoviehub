import { MainSlider } from "../components/MainSlider/MainSlider"
import { MovieCard } from "../components/MovieCard/MovieCard"
import { MovieCardUpcoming } from "../components/MovieCardUpcoming/MovieCardUpcoming"
import { CategorySlider } from "../components/CategorySlider/CategorySlider"
import { MovieSliderGeneral } from "../components/MovieSlider/MovieSliderGeneral"
import { IMovieResponse } from "../interfaces/responses"
import styles from "./movies.module.scss"
import { FormattedDateSearch } from "../utils/helpers"
import { GetNowPlaying, GetPopularMovies, GetTopRatedMovies, GetUpcomingMovies } from "../services/fetchData"
import { IMovie } from "../interfaces/movie"

// Evita que el build falle si la API requiere datos dinámicos
export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const currentTheatres: IMovie[] = (await GetNowPlaying()) || []

    const params = await searchParams
    const page = Number(params.page) || 1

    const popularMovies: IMovieResponse = (await GetPopularMovies(page)) || { results: [] }
    const ratingMovies: IMovieResponse = (await GetTopRatedMovies(page)) || { results: [] }
    const upcomingMovies: IMovieResponse = (await GetUpcomingMovies(page)) || { results: [] }

    const dateStart = FormattedDateSearch(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toISOString())
    const dateEnd = FormattedDateSearch(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 90)).toISOString())

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <MainSlider movies={currentTheatres?.filter((_, index) => index < 10) || []} />
            <div className={styles.content}>
                <CategorySlider type="movie" />
                <MovieSliderGeneral title="Mejor Valoradas" list_link="/movies/results/list?sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200">
                    <>
                        {ratingMovies?.results?.map((movie, index) => (
                            <MovieCard key={movie.id} movie={movie} top={index + 1} />
                        ))}
                    </>
                </MovieSliderGeneral>
                <div className="separator"></div>
                <MovieSliderGeneral title="Populares" list_link="/movies/results/list?sort_by=popularity.desc">
                    <>
                        {popularMovies?.results?.map((movie, index) => (
                            <MovieCard key={movie.id} movie={movie} top={index + 1} />
                        ))}
                    </>
                </MovieSliderGeneral>
                <div className="separator"></div>
                <MovieSliderGeneral title="Próximamente" list_link={`/movies/results/list?sort_by=popularity.desc&with_release_type=2,3&release_date.gte=${dateStart}&release_date.lte=${dateEnd}`}>
                    <>
                        {upcomingMovies?.results?.map((movie, index) => (
                            <MovieCardUpcoming key={movie.id} movie={movie} />
                        ))}
                    </>
                </MovieSliderGeneral>
            </div>
        </section>
    )
}