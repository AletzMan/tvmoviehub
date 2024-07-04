"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { ComboBox } from "../ComboBox/ComboBox"
import styles from "./header.module.scss"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { GetLatestYears } from "@/app/utils/helpers"
import { GetRegions } from "@/app/utils/const"

export function HeaderFiltersSearch() {
    const [currentYear, setCurrentYear] = useState("")
    const [currentRegion, setCurrentRegion] = useState("")
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const section = pathname.split("/")[1]
        const year = searchParams.get(section === "movies" ? "primary_release_year" : "first_air_date_year")
        const region = searchParams.get("region")
        if (year) {
            setCurrentYear(year)
        } else {
            setCurrentYear("All")
        }
        if (region) {
            setCurrentRegion(region)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const HandleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        const section = pathname.split("/")[1]
        if (name === "year") {
            const param = section === "movies" ? "primary_release_year" : "first_air_date_year"
            const newParams = new URLSearchParams(searchParams)
            newParams.set(param, `${value}`)
            router.push(`${pathname}?${newParams}`)
        }
        if (name === "region") {
            const newParams = new URLSearchParams(searchParams)
            newParams.set("region", `${value}`)
            router.push(`${pathname}?${newParams}`)
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.header_order}>
                <ComboBox properties={years} label="Año" onChange={HandleChangeSort} defaultValue={currentYear} name="year" />
                {/*NO FUNCIONA EL FILTRO DE REGION SE DEJA PARA SI POSTERIORMENTE SE ACTIVA */}
                {/*pathname.split("/")[1] === "movies" && <ComboBox properties={regions} label="Región" onChange={HandleChangeSort} defaultValue={currentRegion} name="region" />*/}
            </div>
        </header>
    )
}
const years = GetLatestYears(true)

const regions = GetRegions()

