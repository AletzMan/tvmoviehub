import { ISerieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetSearchSeries } from "@/app/services/fetchData"
import { IQueryParamasSeries } from "@/app/interfaces/serie"
import { NotResultsView } from "@/app/components/NotResultsView/NotResultsView"
import { HeaderFiltersSearch } from "@/app/components/HeaderFiltersSearch/HeaderFiltersSearch"
import { HeaderSection } from "@/app/components/HeaderSection/HeaderSection"
import { SearchIcon } from "@/app/utils/svg"

export default async function Page(params: { params: { lang: string }, searchParams: IQueryParamasSeries }) {

    const popularSeries: ISerieResponse = await GetSearchSeries(params.searchParams)

    return (
        <section className={`${styles.section}  `}>
            <HeaderSection title="Resultados para: " icon={<SearchIcon />} />
            {popularSeries.results.length > 0 &&
                <>
                    <HeaderFiltersSearch />
                </>
            }
            {popularSeries.results.length > 0 ? <div className={`${styles.movies} scrollBarStyle`}>
                {
                    popularSeries.results.map((movie, index) => (
                        <MovieCardDetails key={movie.id} movie={movie as IPartCollection} type="tv" />
                    ))
                }
            </div>
                :
                <NotResultsView />
            }
            {popularSeries.results.length > 0 && <Pagination currentPage={popularSeries.page} totalPages={popularSeries.total_pages} />}
        </section>
    )
}