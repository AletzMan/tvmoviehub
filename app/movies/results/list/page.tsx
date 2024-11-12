import { IMovieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection, IQueryParamasMovies } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetDiscoverMovies } from "@/app/services/fetchData"
import { HeaderFilters } from "@/app/components/HeaderFilters/HeaderFilters"
import { NotResultsView } from "@/app/components/NotResultsView/NotResultsView"
import { HeaderTags } from "@/app/components/HeaderTags/HeaderTags"
import { ToastProvider } from "@/app/components/ToastProvider/ToastProvider"

export default async function Page(params: { searchParams: IQueryParamasMovies }) {

    const popularMovies: IMovieResponse = await GetDiscoverMovies(params.searchParams)

    return (
        <section className={`${styles.section} `}>
            <HeaderTags />
            <HeaderFilters />
            {(popularMovies.results && popularMovies.results?.length > 0) ?
                <ToastProvider>
                    <div className={`${styles.movies} scrollBarStyle`}>
                        {
                            popularMovies.results.map((movie, index) => (
                                <MovieCardDetails key={movie.id} movie={movie as IPartCollection} type="movie" />
                            ))
                        }
                    </div>
                </ToastProvider>
                :
                <NotResultsView />
            }
            {popularMovies?.results?.length > 0 && <Pagination currentPage={popularMovies.page} totalPages={popularMovies.total_pages} />}
        </section>
    )
}