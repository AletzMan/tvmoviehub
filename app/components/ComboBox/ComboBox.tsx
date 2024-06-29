"use client"
import { ChangeEventHandler } from "react"
import styles from "./combobox.module.scss"

interface IPropertiesCombobox {
    option: string
    value: string
}

interface Props {
    properties: IPropertiesCombobox[]
    onChange?: ChangeEventHandler<HTMLSelectElement>
    label?: string
}

export const ComboBox = ({ properties, onChange, label }: Props) => {


    return (
        <div className={styles.combobox} >
            {label && <label className={styles.combobox_label} >{label}</label>}
            <select className={styles.select} onChange={onChange}>
                {properties.map((property, index) => (
                    <option key={property.option} className={styles.option} value={property.value}>{property.option}</option>
                ))}
            </select>
        </div>
    )
}