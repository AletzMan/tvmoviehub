"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { ComboBox } from "../ComboBox/ComboBox"
import { SortButton } from "../SortButton/SortButton"
import styles from "./header.module.scss"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Filters } from "../Filters/Filters"
import { SectionTags } from "@/app/movies/[id]/components/SectionTags/SectionTags"

export function HeaderFilters() {
    const [defaultSort, setDefaultSort] = useState("")
    const [sortOptions, setSortOptions] = useState(sortMovies)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const currentSort = searchParams.get("sort_by")
        if (currentSort) {
            const currentSortValue = currentSort.split(".")[0]
            setDefaultSort(currentSortValue)
        }
        const section = pathname.split("/")[1]
        const options = section === "movies" ? sortMovies : sortSeries
        setSortOptions(options)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const HandleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        const currentSort = searchParams.get("sort_by")
        if (currentSort) {
            const currentSortValue = currentSort.split(".")[1]
            const newSort = new URLSearchParams(searchParams)
            newSort.set("sort_by", `${value}.${currentSortValue}`)
            router.push(`${pathname}?${newSort}`)
        }
    }

    return (
        <header className={styles.header}>
            <Filters section={pathname.split("/")[1]} />
            <div className={styles.header_order}>
                <ComboBox properties={sortOptions} label="Ordenar por:" onChange={HandleChangeSort} defaultValue={defaultSort} />
                <SortButton />
            </div>
        </header>
    )
}


const sortMovies = [
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

const sortSeries = [
    {
        option: "Nombre",
        value: "name"
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
        option: "Fecha de primera emisión",
        value: "first_air_date"
    },
]