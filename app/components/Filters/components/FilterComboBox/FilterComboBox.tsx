import styles from "./filter.module.scss"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { ArrowDownSolidIcon, ResetIcon, SuccessIcon } from "@/app/utils/svg"
import { Button } from "@/app/components/Button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
    properties: IPropertiesCombobox[]
    nameParam: string
    nameView: string
    section: string
}

interface IPropertiesCombobox {
    option: string | number
    value: string
}

export function FilterComboBox({ nameParam, nameView, properties, section }: Props) {
    const searchParams = useSearchParams()
    const [data, setData] = useState<string | null>(searchParams.get(`${nameParam}`))
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const whitParam = searchParams.get(`${nameParam}`)
        if (whitParam) {
            setData(whitParam)
        } else {
            setData("")
        }
    }, [searchParams, nameParam])


    const HandleChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.currentTarget.value
        setData(newValue)
    }

    const HandleApplyFilter = (e: MouseEvent<HTMLButtonElement>) => {
        const newSearchParams = new URLSearchParams(searchParams)
        if (data) {
            newSearchParams.set(`${nameParam}`, data as string)
            const filterYears = section === "movies" ? "primary_release_date" : "first_air_date"
            newSearchParams.set("sort_by", "primary_release_date.asc")
            newSearchParams.delete(`${filterYears}.gte`)
            newSearchParams.delete(`${filterYears}.lte`)
        } else {
            newSearchParams.delete(`${nameParam}`)
        }
        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const HandleResetFilter = () => {
        setData("")
    }

    return (
        <details className={styles.details} name="d">
            <summary className={styles.summary}>
                <h3 className={styles.summary_title}>{nameView}</h3>
                {data && <div className={styles.summary_count}>{1}</div>}
                <ArrowDownSolidIcon className={styles.summary_icon} />
            </summary>
            <div className={styles.options}>
                <label className={styles.options_label}>
                    <select className={styles.options_select} value={data || ""} onChange={HandleChangeFilter}>
                        <option value={0}>-- Seleccione un año --</option>
                        {properties.map(property => (
                            <option key={property.value} value={property.value}>{property.option}</option>
                        ))

                        }
                    </select>
                </label>
            </div>
            <footer className={styles.footer}>
                <Button text="Aplicar" icon={<SuccessIcon />} onClick={HandleApplyFilter} mode="button" />
                <Button text="Reestablecer" isSecondary icon={<ResetIcon />} onClick={HandleResetFilter} mode="button" />
            </footer>
        </details>
    )
}