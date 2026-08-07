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

    const HandleChangeFilter = (option: string) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(nameParam, option)
        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const HandleResetFilter = () => {
        setData("")
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.delete(nameParam)
        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    return (
        <details className={styles.details} name="d">
            <summary className={styles.summary}>
                <h3 className={styles.summary_title}>{nameView}</h3>
                <ArrowDownSolidIcon className={styles.summary_icon} />
            </summary>
            <div className={styles.options}>
                <div className={styles.combobox}>
                    <button className={styles.combobox_button}>
                        {data}
                        <ArrowDownSolidIcon className={styles.combobox_icon} />
                    </button>
                    <div className={styles.combobox_options}>
                        {properties.map(property => (
                            <button key={property.value} className={styles.combobox_option} onClick={() => HandleChangeFilter(property.option.toString())}>
                                {property.option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Button text="Reestablecer" isSecondary icon={<ResetIcon />} onClick={HandleResetFilter} mode="button" />
            </footer>
        </details>
    )
}