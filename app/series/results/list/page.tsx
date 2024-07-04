import { ISerieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetDiscoverSeries } from "@/app/services/fetchData"
import { IQueryParamasSeries } from "@/app/interfaces/serie"
import { HeaderFilters } from "@/app/components/HeaderFilters/HeaderFilters"
import { NotResultsView } from "@/app/components/NotResultsView/NotResultsView"
import { SectionTags } from "@/app/movies/[id]/components/SectionTags/SectionTags"

export default async function Page(params: { params: { lang: string }, searchParams: IQueryParamasSeries }) {

    const popularSeries: ISerieResponse = await GetDiscoverSeries(params.searchParams)

    return (
        <section className={`${styles.section}  `}>
            <HeaderFilters />
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