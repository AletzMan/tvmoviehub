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

interface IRange {
    gte: number
    lte: number
}

const defaultDate: IRange = {
    gte: 0,
    lte: 0
}

export function FilterRange({ nameParam, nameView, section }: Props) {
    const [date, setDate] = useState<IRange>(defaultDate)
    const [error, setError] = useState(false)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const whitParamGte = searchParams.get(`${nameParam}.gte`)
        const whitParamLte = searchParams.get(`${nameParam}.lte`)

        if (whitParamGte || whitParamLte) {
            setDate({ lte: Number(whitParamLte), gte: Number(whitParamGte) })
        } else {
            setDate({ gte: 0, lte: 0 })
        }
    }, [searchParams, nameParam])


    const HandleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...date }
        if (e.currentTarget.name === 'gte') {
            setDate({ ...newValues, gte: Number(e.currentTarget.value) })
        } else {
            setDate({ ...newValues, lte: Number(e.currentTarget.value) })
        }
    }

    const HandleApplyFilter = (e: MouseEvent<HTMLButtonElement>) => {
        const newSearchParams = new URLSearchParams(searchParams)

        if (date.lte === 0 && date.gte === 0) {
            newSearchParams.delete(`${nameParam}.gte`)
            newSearchParams.delete(`${nameParam}.lte`)
        } if (date.lte !== 0 && date.gte !== 0) {
            newSearchParams.set(`${nameParam}.gte`, date.gte.toString())
            newSearchParams.set(`${nameParam}.lte`, date.lte.toString())
        } else if (date.gte !== 0 && date.lte === 0) {
            newSearchParams.set(`${nameParam}.gte`, date.gte.toString())
            newSearchParams.delete(`${nameParam}.lte`)
        } else if (date.gte === 0 && date.lte !== 0) {
            newSearchParams.set(`${nameParam}.lte`, date.lte.toString())
            newSearchParams.delete(`${nameParam}.gte`)
        }
        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const HandleResetFilter = () => {
        setDate({ gte: 0, lte: 0 })
    }


    return (
        <details className={styles.details} name="d">
            <summary className={styles.summary}>
                <h3 className={styles.summary_title}>{nameView}</h3>
                {(date.gte !== 0 || date.lte !== 0) && <div className={styles.summary_count}>{1}</div>}
                <ArrowDownSolidIcon className={styles.summary_icon} />
            </summary>
            <div className={styles.options}>
                <label className={styles.options_label}>
                    Desde
                    <input className={`${styles.options_input} `} name="gte" type="number" onChange={HandleChangeFilter} value={date.gte} />
                </label>
                <label className={styles.options_label}>
                    Hasta
                    <input className={`${styles.options_input} ${error && styles.options_inputError}`} min={date.gte} name="lte" type="number" onChange={HandleChangeFilter} value={date.lte} />
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