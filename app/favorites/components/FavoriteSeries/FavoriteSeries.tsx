import { ISerieResponse } from "@/app/interfaces/responses"
import styles from "../FavoriteMovies/styles.module.scss"
import { GetFavoriteSeries } from "@/app/services/fetchData"
import { cookies } from "next/headers"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"

interface Props {
    page: string
}

export default async function FavoriteSeries({ page }: Props) {
    const cookie = cookies().get("session_tvmoviehub")?.value

    const movies: ISerieResponse | null = await GetFavoriteSeries(cookie as string, page)

    return (
        <div className={styles.favorites}>
            <section className={`${styles.favorites_section} scrollBarStyle`}>
                {movies?.results.map(movie => (
                    <MovieCardDetails key={movie.id} movie={movie as IPartCollection} type="tv" isFavorites />
                ))
                }
            </section>
            {movies && movies.results.length > 0 && <Pagination currentPage={movies?.page || 1} totalPages={movies?.total_pages || 0} />}
            {movies && movies?.results?.length === 0 &&
                <div className={styles.message}>
                    <p className={styles.message_title}>No has agregado favoritos</p>
                    <p className={styles.message_text}>Empieza a explorar y guarda tus series favoritas para acceder a ellas rápidamente.</p>
                </div>
            }
        </div>
    )
}