import { CategoriesMovies, CategoriesSeries } from "@/app/utils/const"
import styles from "./category.module.scss"
import { MovieSliderGeneral } from "../MovieSlider/MovieSliderGeneral"
import Link from "next/link"

interface Props {
    type: 'serie' | 'movie'
}

export const CategorySlider = ({ type }: Props) => {

    return (
        <MovieSliderGeneral title="Categorías"  >
            {type === "movie" && CategoriesMovies.map(category => (
                <div className={styles.category} key={category.id}>
                    <Link className={styles.category_link} href={`movies/results/list?with_genres=${category.id}`}>
                        {category.icon}
                        <span className={styles.category_name}>{category.name}</span>
                    </Link>
                </div>
            ))}
            {type === "serie" && CategoriesSeries.map(category => (
                <div className={styles.category} key={category.id}>
                    <Link className={styles.category_link} href={`series/results/list?with_genres=${category.id}`}>
                        {category.icon}
                        <span className={styles.category_name}>{category.name}</span>
                    </Link>
                </div>
            ))}
        </MovieSliderGeneral>
    )
}