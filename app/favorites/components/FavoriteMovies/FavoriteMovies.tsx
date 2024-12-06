import { IMovieResponse } from "@/app/interfaces/responses"
import styles from "./styles.module.scss"
import { GetFavoriteMovies, GetWatchList } from "@/app/services/fetchData"
import { cookies } from "next/headers"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection } from "@/app/interfaces/movie"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { IMultiResponse } from "@/app/interfaces/multi"

interface Props {
    page: string
    type: "favorites" | "watchlist"
}

export default async function FavoriteMovies({ page, type }: Props) {
    const cookie = cookies().get("session_tvmoviehub")?.value


    const movies: IMovieResponse | IMultiResponse | null = type === "favorites" ? await GetFavoriteMovies(cookie as string, page) : await GetWatchList(cookie as string, "movies")
    return (
        <div className={styles.favorites}>
            <section className={`${styles.favorites_section} scrollBarStyle`}>
                {movies?.results.map(movie => (
                    <MovieCardDetails key={movie.id} movie={movie as IPartCollection} type="movie" isFavorites />
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