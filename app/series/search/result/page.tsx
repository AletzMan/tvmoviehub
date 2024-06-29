import { ISerieResponse } from "@/app/interfaces/responses"
import styles from "../lists.module.scss"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { GetSearchSeries } from "@/app/services/fetchData"
import { PopularIcon } from "@/app/utils/svg"
import { IQueryParamasSeries } from "@/app/interfaces/serie"

export default async function Page(params: { params: { lang: string }, searchParams: IQueryParamasSeries }) {

    const popularMovies: ISerieResponse = await GetSearchSeries(params.searchParams)

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <header className={styles.header}>
                <h2 className={styles.header_title}>Populares</h2>
                <PopularIcon className={styles.header_icon} />
            </header>
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