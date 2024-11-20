import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { FavoriteFullIcon } from "../utils/svg"
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "./components/FavoriteSeries/FavoriteSeries"
import SelectFavorite from "./components/SelectFavorite/SelectFavorite"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {
    return (
        <section>
            <HeaderSection title="Mis favoritos" icon={<FavoriteFullIcon />} />
            <SelectFavorite />
            {params.searchParams?.type === "movies" ? <FavoriteMovies page={params.searchParams?.page || "1"} /> : <FavoriteSeries page={params.searchParams?.page || "1"} />}
        </section>
    )
}