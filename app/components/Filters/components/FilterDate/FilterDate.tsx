import { CheckBox } from "@/app/components/CheckBox/CheckBox"
import styles from "./filter.module.scss"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { ArrowDownSolidIcon, ResetIcon, SuccessIcon } from "@/app/utils/svg"
import { Button } from "@/app/components/Button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
    nameParam: string
    nameView: string
    section: string
}

interface IDate {
    gte: string
    lte: string
}

const defaultDate: IDate = {
    gte: "",
    lte: ""
}

export function FilterDate({ nameParam, nameView, section }: Props) {
    const [date, setDate] = useState<IDate>(defaultDate)
    const [error, setError] = useState(false)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const whitParamGte = searchParams.get(`${nameParam}.gte`)
        const whitParamLte = searchParams.get(`${nameParam}.lte`)

        if (whitParamGte && whitParamLte) {
            setDate({ lte: whitParamLte, gte: whitParamGte })
        } else {
            setDate({ gte: "", lte: "" })
        }
    }, [searchParams, nameParam])


    const HandleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...date }
        if (e.currentTarget.name === 'gte') {
            setDate({ ...newValues, gte: e.currentTarget.value })
        } else {
            setDate({ ...newValues, lte: e.currentTarget.value })
        }
        setError(false)
    }

    const HandleApplyFilter = (e: MouseEvent<HTMLButtonElement>) => {
        const newSearchParams = new URLSearchParams(searchParams)

        if (date.lte === "" && date.gte === "") {
            newSearchParams.delete(`${nameParam}.gte`)
            newSearchParams.delete(`${nameParam}.lte`)
            setError(false)

        } else if (date.gte !== "" && date.lte !== "") {
            newSearchParams.set(`${nameParam}.gte`, date.gte as string)
            newSearchParams.set(`${nameParam}.lte`, date.lte as string)
            const filterYear = section === "movies" ? "primary_release_year" : "first_air_date_year"
            newSearchParams.set("sort_by", "primary_release_date.asc")
            newSearchParams.delete(filterYear)

        } else {
            setError(true)
        }

        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const HandleResetFilter = () => {
        setDate({ gte: "", lte: "" })
    }


    return (
        <details className={styles.details} name="d">
            <summary className={styles.summary}>
                <h3 className={styles.summary_title}>{nameView}</h3>
                {(date.gte !== "" && date.lte !== "") && <div className={styles.summary_count}>{1}</div>}
                <ArrowDownSolidIcon className={styles.summary_icon} />
            </summary>
            <div className={styles.options}>
                <label className={styles.options_label}>
                    Desde
                    <input className={`${styles.options_input} `} name="gte" type="date" onChange={HandleChangeFilter} value={date.gte} />
                </label>
                <label className={styles.options_label}>
                    Hasta
                    <input className={`${styles.options_input} ${error && styles.options_inputError}`} min={date.gte} name="lte" type="date" disabled={date.gte === ""} onChange={HandleChangeFilter} value={date.lte} />
                    {error && <span className={styles.options_error}>Elige una fecha</span>}
                </label>
            </div>
            <footer className={styles.footer}>
                <Button text="Aplicar" icon={<SuccessIcon />} onClick={HandleApplyFilter} mode="button" />
                <Button text="Reestablecer" isSecondary icon={<ResetIcon />} onClick={HandleResetFilter} mode="button" />
            </footer>
        </details>
    )
}