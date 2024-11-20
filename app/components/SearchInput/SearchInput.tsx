/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { SearchIcon } from "@/app/utils/svg"
import styles from "./searchinput.module.scss"
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { RadioButton } from "../RadioButton/RadioButton"
import { Button } from "../Button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface IOptions {
    search: boolean
    movies: boolean
    series: boolean
    people: boolean
}

const defaultOptions: IOptions = {
    search: true,
    movies: false,
    series: false,
    people: false
}

const sectionType = {
    movies: "películas",
    series: "series",
    people: "personas"
}

type Props = {
    section: string
    onSearch: () => void

}
export const SearchInput = ({ section, onSearch }: Props) => {
    const searchParams = useSearchParams()
    const [selectOption, setSelectOption] = useState<IOptions>(defaultOptions)
    const [placeholder, setPlaceholder] = useState("Buscar en películas, series y personas")
    const [search, setSearch] = useState("")
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const query = searchParams.get("query")

        if (query) {
            setSearch(query)
        } else {
            setSearch("")
        }
        let newStatusChecked: IOptions = selectOption
        if (Object.keys(sectionType).includes(section)) {
            newStatusChecked = { ...defaultOptions, search: false, [section]: true }
            setPlaceholder(`Buscar ${sectionType[section as ("movies" | "series" | "people")]}`)
        } else {
            newStatusChecked = { ...defaultOptions, search: true }
            setPlaceholder("Buscar en películas, series y personas")
        }
        setSelectOption(newStatusChecked)

    }, [section, pathname])

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.id
        const checked = e.currentTarget.checked

        let newStatusChecked: IOptions = selectOption
        if (name === "all") {
            if (checked) {
                setPlaceholder("Buscar en películas, series y personas")
                newStatusChecked = { search: true, movies: false, series: false, people: false }
            } else {
                if (section) {
                    newStatusChecked = { ...defaultOptions, search: false, [section]: true }
                }
                else {
                    newStatusChecked = { ...defaultOptions, search: false, movies: true }
                }
            }
        } else {
            newStatusChecked = { ...defaultOptions, search: false, [name]: true }
            setPlaceholder(`Buscar ${sectionType[name as ("movies" | "series" | "people")]}`)
        }
        setSelectOption(newStatusChecked)
    }

    const HandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const currentSearch = e.currentTarget.value
        setSearch(currentSearch)
    }

    const HandlekeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && search !== "" && search.length > 2) {
            Search()
        }
    }

    const Search = () => {
        if (selectOption.movies) {
            router.push(`/movies/results/search?query=${search}&page=1`)
        } else if (selectOption.series) {
            router.push(`/series/results/search?query=${search}&page=1`)
        } else if (selectOption.people) {
            router.push(`/people/results/search?query=${search}&page=1`)
        } else if (selectOption.search) {
            router.push(`/search?query=${search}&page=1`)
        }
        onSearch()
    }

    return (
        <header className={styles.search_header}>
            <div className={styles.search}>
                <SearchIcon className={styles.search_icon} />
                <input className={styles.search_input} type="search" placeholder={placeholder} onChange={HandleSearch} onKeyDown={HandlekeyDown} value={search} />
                <Button className={styles.search_button} onClick={Search} text="Buscar" disabled={search.length < 3} mode="button" />
            </div>
            <div className={styles.checkbox}>
                <RadioButton checkBoxOnChange={HandleChange} label="Todo" name="type_search" id="all" checked={selectOption.search} />
                <RadioButton checkBoxOnChange={HandleChange} label="Peliculas" name="type_search" id="movies" checked={selectOption.movies} />
                <RadioButton checkBoxOnChange={HandleChange} label="Series" name="type_search" id="series" checked={selectOption.series} />
                <RadioButton checkBoxOnChange={HandleChange} label="Personas" name="type_search" id="people" checked={selectOption.people} />
            </div>
        </header>
    )
}