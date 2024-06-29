import { IMovieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection, IQueryParamasMovies } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetSearchMovies } from "@/app/services/fetchData"
import { HeaderFilters } from "@/app/components/HeaderFilters/HeaderFilters"

export default async function Page(params: { searchParams: IQueryParamasMovies }) {

    const popularMovies: IMovieResponse = await GetSearchMovies(params.searchParams)

    return (
        <section className={`${styles.section} `}>
            <HeaderFilters />
            <div className={`${styles.movies} scrollBarStyle`}>
                {
                    popularMovies.results.map((movie, index) => (
                        <MovieCardDetails key={movie.id} movie={movie as IPartCollection} />
                    ))
                }
            </div>
            <Pagination currentPage={popularMovies.page} totalPages={popularMovies.total_pages} />
        </section>
    )
}