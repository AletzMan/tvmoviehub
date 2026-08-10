"use client"

import { ChangeEvent, useEffect, useState, Suspense } from "react"
import { ComboBox } from "../ComboBox/ComboBox"
import { SortButton } from "../SortButton/SortButton"
import styles from "./header.module.scss"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function HeaderFiltersContent() {
    const [defaultSort, setDefaultSort] = useState("")
    const [sortOptions, setSortOptions] = useState(sortMovies)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const currentSort = searchParams.get("sort_by")
        const newSort = new URLSearchParams(searchParams.toString())
        if (currentSort) {
            const currentSortValue = currentSort.split(".")[0]
            setDefaultSort(currentSortValue)
        } else {
            newSort.set("sort_by", `popularity.desc`)
            router.push(`${pathname}?${newSort.toString()}`)
        }
        const section = pathname.split("/")[1]
        const options = section === "movies" ? sortMovies : sortSeries
        setSortOptions(options)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const HandleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        const currentSort = searchParams.get("sort_by")
        const newSort = new URLSearchParams(searchParams.toString())

        if (currentSort) {
            const currentSortValue = currentSort.split(".")[1] || "desc"
            newSort.set("sort_by", `${value}.${currentSortValue}`)
        } else {
            newSort.set("sort_by", `${value}.desc`)
        }
        router.push(`${pathname}?${newSort.toString()}`)
    }

    return (
        <header className={styles.header}>
            <div className={styles.header_order}>
                <ComboBox properties={sortOptions} label="Ordenar por:" onChange={HandleChangeSort} defaultValue={defaultSort} />
                <SortButton />
            </div>
        </header>
    )
}

export function HeaderFilters() {
    return (
        <Suspense fallback={null}>
            <HeaderFiltersContent />
        </Suspense>
    )
}

const sortMovies = [
    { option: "Título", value: "title" },
    { option: "Popularidad", value: "popularity" },
    { option: "Valoración", value: "vote_average" },
    { option: "Fecha de lanzamiento", value: "primary_release_date" },
]

const sortSeries = [
    { option: "Nombre", value: "name" },
    { option: "Popularidad", value: "popularity" },
    { option: "Valoración", value: "vote_average" },
    { option: "Fecha de primera emisión", value: "first_air_date" },
]