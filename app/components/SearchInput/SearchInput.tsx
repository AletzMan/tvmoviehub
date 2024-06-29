"use client"
import { SearchIcon } from "@/app/utils/svg"
import styles from "./searchinput.module.scss"
import { CheckBox } from "../CheckBox/CheckBox"
import { ChangeEvent, useEffect, useState } from "react"

interface IOptions {
    all: boolean
    movies: boolean
    series: boolean
    people: boolean
}

const defaultOptions: IOptions = {
    all: true,
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

}
export const SearchInput = ({ section }: Props) => {
    const [selectOption, setSelectOption] = useState<IOptions>(defaultOptions)
    const [placeholder, setPlaceholder] = useState("Buscar en películas, series y personas")

    useEffect(() => {
        let newStatusChecked: IOptions = selectOption
        if (section) {
            newStatusChecked = { ...defaultOptions, all: false, [section]: true }
            setPlaceholder(`Buscar ${sectionType[section as ("movies" | "series" | "people")]}`)
        } else {
            newStatusChecked = { ...defaultOptions, all: true }
            setPlaceholder("Buscar en películas, series y personas")
        }
        setSelectOption(newStatusChecked)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section])

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name
        const checked = e.currentTarget.checked

        let newStatusChecked: IOptions = selectOption
        if (name === "all") {
            if (checked) {
                setPlaceholder("Buscar en películas, series y personas")
                newStatusChecked = { all: true, movies: false, series: false, people: false }
            } else {
                if (section) {
                    newStatusChecked = { ...defaultOptions, all: false, [section]: true }
                }
                else {
                    newStatusChecked = { ...defaultOptions, all: false, movies: true }
                }
            }
        } else {
            newStatusChecked = { ...defaultOptions, all: false, [name]: true }
            setPlaceholder(`Buscar ${sectionType[name as ("movies" | "series" | "people")]}`)
        }
        setSelectOption(newStatusChecked)
    }

    return (
        <>
            <div className={styles.search}>
                <SearchIcon className={styles.search_icon} />
                <input className={styles.search_input} placeholder={placeholder} />
            </div>
            <div className={styles.checkbox}>
                <CheckBox checkBoxOnChange={HandleChange} label="Todo" name="all" id="all" checked={selectOption.all} />
                <CheckBox checkBoxOnChange={HandleChange} label="Peliculas" name="movies" id="only" checked={selectOption.movies} />
                <CheckBox checkBoxOnChange={HandleChange} label="Series" name="series" id="only" checked={selectOption.series} />
                <CheckBox checkBoxOnChange={HandleChange} label="Personas" name="people" id="only" checked={selectOption.people} />
            </div>
        </>
    )
}