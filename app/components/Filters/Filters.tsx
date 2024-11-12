"use client"
import { FiltersIcon, ResetIcon } from "@/app/utils/svg"
import styles from "./filters.module.scss"
import { CheckBox } from "../CheckBox/CheckBox"
import { ChangeEvent, useEffect, useState } from "react"
import { Filter } from "./components/Filter/Filter"
import { Button } from "../Button/Button"
import { FilterDate } from "./components/FilterDate/FilterDate"
import { FilterComboBox } from "./components/FilterComboBox/FilterComboBox"
import { GetLatestYears } from "@/app/utils/helpers"
import { FilterRange } from "./components/FilterRange/FilterRange"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
    section: string
}

export function Filters({ section }: Props) {
    const [categories, setCategories] = useState(categoriesMovies)
    const [open, setOpen] = useState(false)
    const [numberFilters, setNumberFilters] = useState(0)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const newCategories = section === "movies" ? categoriesMovies : categoriesSeries
        setCategories(newCategories)
        let number = 0
        for (let index = 0; index < FilterNames.length; index++) {
            const filter = searchParams.get(FilterNames[index])
            if (filter) {
                number++
            }
        }
        setNumberFilters(number)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const HandleOpen = () => {
        setOpen(prev => !prev)
    }

    const HandleAllResetFilter = () => {
        router.push(`${pathname}?page=1`)
        setNumberFilters(0)
    }


    return (
        <>
            <section className={styles.section}>
                <button className={`${styles.button} ${open && styles.button_active}`} onClick={HandleOpen}>
                    <FiltersIcon className={styles.button_icon} />
                    Filtros
                    <span className={styles.button_number}>{numberFilters}</span>
                </button>
                <div className={`${styles.filters_triangle} ${open && styles.filters_triangleOpen}`}></div>
                <div className={`${styles.filters} ${open && styles.filters_open} scrollBarStyle`}>
                    <Filter properties={categories} nameView="Géneros" nameParam="with_genres" />
                    {section === "movies" && <Filter properties={Certifications} nameView="Clasificación" nameParam="certification" />}
                    {section === "movies" && <Filter properties={releaseTypes} nameView="Tipos de lanzamiento" nameParam="with_release_type" />}
                    <FilterDate nameView="Fecha de lanzamiento" section={section} nameParam={section === "movies" ? "primary_release_date" : "first_air_date"} />
                    <FilterComboBox properties={years} section={section} nameView="Año de lanzamiento" nameParam={section === "movies" ? "primary_release_year" : "first_air_date_year"} />
                    <FilterRange nameView="Valoración" section={section} nameParam={"vote_average"} />
                    <FilterRange nameView="Votos" section={section} nameParam={"vote_count"} />
                    <footer className={styles.filters_footer}>
                        <Button text="Reestablecer todo" icon={<ResetIcon />} onClick={HandleAllResetFilter} mode="button" />
                    </footer>

                </div>
            </section>
            {open &&
                <dialog className={styles.dialog} open onClick={HandleOpen}>
                </dialog>
            }
        </>
    )
}

const FilterNames = [
    "with_genres",
    "certification",
    "with_release_type",
    "primary_release_date.gte",
    "first_air_date",
    "primary_release_year",
    "first_air_date_year",
    "vote_average.gte",
    "vote_count.gte"
]


const categoriesMovies = [{
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

const categoriesSeries = [
    {
        option: "Acción & Aventura",
        value: "10759"
    },
    {
        option: "Animación",
        value: "16"
    },
    {
        option: "Comedia",
        value: "35"
    },
    {
        option: "Crimen",
        value: "80"
    },
    {
        option: "Documental",
        value: "99"
    },
    {
        option: "Drama",
        value: "18"
    },
    {
        option: "Familia",
        value: "10751"
    },
    {
        option: "Kids",
        value: "10762"
    },
    {
        option: "Misterio",
        value: "9648"
    },
    {
        option: "Noticias",
        value: "10763"
    },
    {
        option: "Reality",
        value: "10764"
    },
    {
        option: "Ciencia ficción",
        value: "10765"
    },
    {
        option: "Telenovelas",
        value: "10766"
    },
    {
        option: "Talk",
        value: "10767"
    },
    {
        option: "Bélica",
        value: "10768"
    },
    {
        option: "Western",
        value: "37"
    }
]

const releaseTypes = [
    {
        option: "Estreno(Premiere)",
        value: "1"
    },
    {
        option: "Estreno en cines",
        value: "3"
    },
    {
        option: "Lanzamiento digital",
        value: "4"
    },
    {
        option: "Lanzamiento físico",
        value: "5"
    },
    {
        option: "Lanzamiento en TV",
        value: "6"
    }
]

export const Certifications = [
    {
        value: "AA",
        option: "Menores de 7 años (AA)"
    },
    {
        value: "A",
        option: "Para todos los grupos de edad (A)"
    },
    {
        value: "B",
        option: "Adolescentes a partir de 12 años (B)"
    },
    {
        value: "B-15",
        option: "Mayores de 15 años (B-15)"
    },
    {
        value: "C",
        option: "Para mayores de 18 años. (C)"
    },
    {
        value: "D",
        option: "Películas para adultos (D)"
    }
]

const years = GetLatestYears()