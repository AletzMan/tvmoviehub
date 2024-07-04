import { CheckBox } from "@/app/components/CheckBox/CheckBox"
import styles from "./filter.module.scss"
import { MouseEvent, useEffect, useState } from "react"
import { ArrowDownSolidIcon, ResetIcon, SuccessIcon } from "@/app/utils/svg"
import { Button } from "@/app/components/Button/Button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
    properties: IOptions[]
    nameParam: string
    nameView: string
}

interface IOptions {
    option: string
    value: string
}

export function Filter({ properties, nameParam, nameView }: Props) {
    const [valuesActive, setValuesActive] = useState<Array<boolean>>([false, false])
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        let newValues: boolean[] = []

        const whitParam = searchParams.get(nameParam)
        if (whitParam) {
            const values = whitParam.split(",")
            for (let index = 0; index < properties.length; index++) {
                newValues.push(values.includes(properties[index].value))
            }
            setValuesActive(newValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties])


    const HandleChangeFilter = (index: number) => {
        const newsValues = [...valuesActive]
        newsValues[index] = !newsValues[index]
        setValuesActive(newsValues)
    }

    const HandleApplyFilter = () => {
        const selectOptions = properties.filter((_, index) => valuesActive[index]).map(option => option.value).join()
        const newSearchParams = new URLSearchParams(searchParams)
        if (valuesActive.some(value => value)) {
            newSearchParams.set(nameParam, selectOptions)
        } else {
            newSearchParams.delete(nameParam)
        }
        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const HandleResetFilter = () => {
        setValuesActive([])
    }

    return (
        <details className={styles.details} name="d">
            <summary className={styles.summary}>
                <h3 className={styles.summary_title}>{nameView}</h3>
                {valuesActive.filter(value => value).length > 0 && <div className={styles.summary_count}>{valuesActive.filter(value => value).length}</div>}
                <ArrowDownSolidIcon className={styles.summary_icon} />
            </summary>
            <div className={styles.options}>
                {properties.map((category, index) => (
                    <CheckBox key={category.value} name={category.value} id="category" label={category.option} checkBoxOnChange={(e) => HandleChangeFilter(index)} checked={valuesActive[index]} />
                ))
                }
            </div>
            <footer className={styles.footer}>
                <Button text="Aplicar" icon={<SuccessIcon />} onClick={HandleApplyFilter} mode="button" />
                <Button text="Reestablecer" isSecondary icon={<ResetIcon />} onClick={HandleResetFilter} mode="button" />
            </footer>
        </details>
    )
}