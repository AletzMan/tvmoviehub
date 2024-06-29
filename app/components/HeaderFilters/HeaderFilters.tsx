import { ComboBox } from "../ComboBox/ComboBox"
import { SortButton } from "../SortButton/SortButton"
import styles from "./header.module.scss"

export function HeaderFilters() {


    const categories = [{
        option: "Acción",
        value: "28",
    },
    {
        option: "Aventura",
        value: "12",
    },
    {
        option: "Animación",
        value: "16",
    },
    {
        option: "Comedia",
        value: "35",
    },
    {
        option: "Crimen",
        value: "80",
    },
    {
        option: "Documental",
        value: "99",
    },
    {
        option: "Drama",
        value: "18",
    },
    {
        option: "Familia",
        value: "10751",
    },
    {
        option: "Fantasía",
        value: "14",
    },
    {
        option: "Historia",
        value: "36",
    },
    {
        option: "Terror",
        value: "27",
    },
    {
        option: "Música",
        value: "10402",
    },
    {
        option: "Misterio",
        value: "9648",
    },
    {
        option: "Romance",
        value: "10749",
    },
    {
        option: "Ciencia ficción",
        value: "878",
    },
    {
        option: "Película de TV",
        value: "10770",
    },
    {
        option: "Suspenso",
        value: "53",
    },
    {
        option: "Bélica",
        value: "10752",
    },
    {
        option: "Western",
        value: "37",
    }
    ]

    const sort = [
        {
            option: "Título",
            value: "title"
        },
        {
            option: "Popularidad",
            value: "popularity"
        },
        {
            option: "Valoración",
            value: "vote_average"
        },
        {
            option: "Fecha de lanzamiento",
            value: "primary_release_date"
        },
    ]

    return (
        <header className={styles.header}>
            <div className={styles.header_order}>
                <ComboBox properties={sort} label="Ordenar por:" />
                <SortButton />
            </div>
        </header>
    )
}