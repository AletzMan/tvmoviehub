import { IMovieResponse } from "@/app/interfaces/responses"
import styles from "./styles.module.scss"
import { GetFavoriteMovies } from "@/app/services/fetchData"
import { cookies } from "next/headers"
import { MovieCardDetails } from "@/app/components/MovieCardDetails/MovieCardDetails"
import { IPartCollection } from "@/app/interfaces/movie"
import { ToastProvider } from "@/app/components/ToastProvider/ToastProvider"
import { Pagination } from "@/app/components/Pagination/Pagination"

export default async function FavoriteMovies() {
    const cookie = cookies().get("session_tvmoviehub")?.value

    const movies: IMovieResponse | null = await GetFavoriteMovies(cookie as string)

    return (
        <div className={styles.favorites}>
            <ToastProvider>
                <section className={`${styles.favorites_section} scrollBarStyle`}>
                    {movies?.results.map(movie => (
                        <MovieCardDetails key={movie.id} movie={movie as IPartCollection} type="movie" isFavorites />
                    ))
                    }
                </section>
            </ToastProvider>
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