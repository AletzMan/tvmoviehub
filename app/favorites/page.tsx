import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { FavoriteFullIcon } from "../utils/svg"
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies"
import FavoriteSeries from "./components/FavoriteSeries/FavoriteSeries"
import FavoritesToggle from "./components/FavoritesToggle/FavoritesToggle"
import styles from "./styles.module.scss"

export default async function Page({ searchParams }: { searchParams: Promise<{ type: string, page: string }> }) {
    const params = await searchParams
    const currentType = params?.type || "movies"
    return (
        <section className={styles.section}>
            <HeaderSection title="Mis favoritos" icon={<FavoriteFullIcon />} />
            <FavoritesToggle />
            {currentType === "movies" ? <FavoriteMovies page={params?.page || "1"} type="favorites" /> : <FavoriteSeries page={params?.page || "1"} type="favorites" />}
        </section>
    );
}