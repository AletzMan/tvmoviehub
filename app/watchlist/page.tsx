import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import FavoriteMovies from "../favorites/components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "../favorites/components/FavoriteSeries/FavoriteSeries"
import SelectFavorite from "../favorites/components/SelectFavorite/SelectFavorite"
import { BookmarkIcon, ListIcon } from "../utils/svg"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {

    return (
        <section>
            <HeaderSection title="Lista de Seguimiento" icon={<BookmarkIcon />} />
            <SelectFavorite />
            {params.searchParams?.type === "movies" ? <FavoriteMovies page={params.searchParams?.page || "1"} type="watchlist" /> : <FavoriteSeries page={params.searchParams?.page || "1"} type="watchlist" />}
        </section>
    )
}