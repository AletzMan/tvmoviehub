import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { IQueryParamasMovies } from "../interfaces/movie"
import { FavoriteFullIcon } from "../utils/svg"
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "./components/FavoriteSeries/FavoriteSeries"
import SelectFavorite from "./components/SelectFavorite/SelectFavorite"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {
    console.log(params.searchParams)
    return (
        <section>
            <HeaderSection title="Mis favoritos" icon={<FavoriteFullIcon />} />
            <SelectFavorite />
            {params.searchParams?.type === "movies" ? <FavoriteMovies /> : <FavoriteSeries />}
        </section>
    )
}