import { IMovieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection, IQueryParamasMovies } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetDiscoverMovies } from "@/app/services/fetchData"
import { HeaderFilters } from "@/app/components/HeaderFilters/HeaderFilters"
import { NotResultsView } from "@/app/components/NotResultsView/NotResultsView"
import { HeaderTags } from "@/app/components/HeaderTags/HeaderTags"
import { Filters } from "@/app/components/Filters/Filters"

export default async function Page({ searchParams }: { searchParams: Promise<IQueryParamasMovies> }) {

    const params = await searchParams
    const popularMovies: IMovieResponse = await GetDiscoverMovies(params)

    return (
        <section className={`${styles.section} `}>
            <HeaderTags />
            <div className={styles.layout}>
                <Filters section="movies" />
                <div className={styles.content}>
                    <HeaderFilters />
                    {(popularMovies.results && popularMovies.results?.length > 0) ?
                        <div className={`${styles.movies} scrollBarStyle`}>
                            {
                                popularMovies.results.map((movie, index) => (
                                    <MovieCardDetails key={movie.id} movie={movie as IPartCollection} type="movie" />
                                ))
                            }
                        </div>
                        :
                        <NotResultsView />
                    }
                    {popularMovies?.results?.length > 0 && <Pagination currentPage={popularMovies.page} totalPages={popularMovies.total_pages} />}
                </div>
            </div>
        </section>
    )
}