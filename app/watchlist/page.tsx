import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import FavoriteMovies from "../favorites/components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "../favorites/components/FavoriteSeries/FavoriteSeries"
import SelectFavorite from "../favorites/components/SelectFavorite/SelectFavorite"
import { BookmarkIcon, ListIcon } from "../utils/svg"
import styles from "./styles.module.scss"

export default async function Page({ searchParams }: { searchParams: Promise<{ type: string, page: string }> }) {
    const params = await searchParams

    return (
        <section>
            <HeaderSection title="Lista de Seguimiento" icon={<BookmarkIcon />} />
            <SelectFavorite />
            {params?.type === "movies" ? <FavoriteMovies page={params?.page || "1"} type="watchlist" /> : <FavoriteSeries page={params?.page || "1"} type="watchlist" />}
        </section>
    );
}