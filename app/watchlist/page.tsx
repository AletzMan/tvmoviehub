import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import FavoriteMovies from "../favorites/components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "../favorites/components/FavoriteSeries/FavoriteSeries"
import WatchlistToggle from "./components/WatchlistToggle/WatchlistToggle"
import { BookmarkIcon } from "../utils/svg" 
import styles from "./watchlist.module.scss"    

export default async function Page({ searchParams }: { searchParams: Promise<{ type: string, page: string }> }) {
    const params = await searchParams
    const currentType = params?.type || "movies"

    console.log("Watchlist", params)

    return (
        <section className={styles.watchlist}>
            <HeaderSection title="Lista de Seguimiento" icon={<BookmarkIcon />} />
            <WatchlistToggle />
            {currentType === "movies" ? <FavoriteMovies page={params?.page || "1"} type="watchlist" /> : <FavoriteSeries page={params?.page || "1"} type="watchlist" />}
        </section>
    );
}