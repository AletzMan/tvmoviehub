/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { SearchIcon } from "@/app/utils/svg"
import styles from "./searchinput.module.scss"
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { RadioButtonGroup } from "../RadioButton/RadioButtonGroup"
import { Button } from "../Button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const sectionType = {
    movies: "películas",
    series: "series",
    people: "personas"
}

const searchOptions = [
    { id: "movies", label: "Películas" },
    { id: "series", label: "Series" },
    { id: "people", label: "Personas" }
]

type Props = {
    section: string
    onSearch: () => void

}
function SearchInputContent({ section, onSearch }: Props) {
    const searchParams = useSearchParams()
    const [selectedOption, setSelectedOption] = useState<string>("movies")
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
        if (Object.keys(sectionType).includes(section)) {
            setSelectedOption(section)
            setPlaceholder(`Buscar ${sectionType[section as ("movies" | "series" | "people")]}`)
        } else {
            setSelectedOption("movies")
            setPlaceholder("Buscar en películas, series y personas")
        }

    }, [section, pathname])

    const HandleChange = (value: string) => {
        setSelectedOption(value)
        setPlaceholder(`Buscar ${sectionType[value as ("movies" | "series" | "people")]}`)
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
        if (selectedOption === "movies") {
            router.push(`/movies/results/search?query=${search}&page=1`)
        } else if (selectedOption === "series") {
            router.push(`/series/results/search?query=${search}&page=1`)
        } else if (selectedOption === "people") {
            router.push(`/people/results/search?query=${search}&page=1`)
        }
        onSearch()
    }

    return (
        <header className={styles.search_header}>
            <div className={styles.search}>
                <SearchIcon className={styles.search_icon} />
                <input
                    className={styles.search_input}
                    type="search"
                    placeholder={placeholder}
                    onChange={HandleSearch}
                    onKeyDown={HandlekeyDown}
                    value={search}
                    autoFocus
                />
                <Button className={styles.search_button} onClick={Search} text="Buscar" disabled={search.length < 3} mode="button" />
            </div>
            <div className={styles.checkbox}>
                <RadioButtonGroup
                    options={searchOptions}
                    name="type_search"
                    selectedValue={selectedOption}
                    onChange={HandleChange}
                />
            </div>
        </header>
    )
}

export const SearchInput = (props: Props) => {
    return (
        <Suspense fallback={null}>
            <SearchInputContent {...props} />
        </Suspense>
    )
}