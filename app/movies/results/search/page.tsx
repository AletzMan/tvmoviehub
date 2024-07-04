import { IMovieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection, IQueryParamasMovies } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetSearchMovies } from "@/app/services/fetchData"
import { NotResultsView } from "@/app/components/NotResultsView/NotResultsView"
import { HeaderFiltersSearch } from "@/app/components/HeaderFiltersSearch/HeaderFiltersSearch"
import { HeaderSection } from "@/app/components/HeaderSection/HeaderSection"
import { SearchIcon } from "@/app/utils/svg"

export default async function Page(params: { searchParams: IQueryParamasMovies }) {

    const popularMovies: IMovieResponse = await GetSearchMovies("movie", params.searchParams)

    return (
        <section className={`${styles.section} `}>
            <HeaderSection title="Resultados para: " icon={<SearchIcon />} />
            {popularMovies.results.length > 0 &&
                <>
                    <HeaderFiltersSearch />
                </>
            }
            {popularMovies.results.length > 0 ?
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
            {popularMovies.results.length > 0 && <Pagination currentPage={popularMovies.page} totalPages={popularMovies.total_pages} />}
        </section>
    )
}