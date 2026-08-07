import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { FavoriteFullIcon } from "../utils/svg"
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "./components/FavoriteSeries/FavoriteSeries"
import SelectFavorite from "./components/SelectFavorite/SelectFavorite"
import styles from "./styles.module.scss"

export default async function Page({ searchParams }: { searchParams: Promise<{ type: string, page: string }> }) {
    const params = await searchParams
    return (
        <section>
            <HeaderSection title="Mis favoritos" icon={<FavoriteFullIcon />} />
            <SelectFavorite />
            {params?.type === "movies" ? <FavoriteMovies page={params?.page || "1"} type="favorites" /> : <FavoriteSeries page={params?.page || "1"} type="favorites" />}
        </section>
    );
}