"use client"
import { ChangeEventHandler } from "react"
import styles from "./combobox.module.scss"

interface Props {
    number: number
    onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const ComboBox = ({ number, onChange }: Props) => {
    const numberSeasons = new Array(number)

    for (let index = 0; index < numberSeasons.length; index++) {
        numberSeasons[index] = (`Temporada ${index + 1}`)
    }

    return (
        <select className={styles.select} onChange={onChange}>
            {numberSeasons.map((season, index) => (
                <option key={season} className={styles.option} value={index + 1}>{season}</option>
            ))}
        </select>
    )
}