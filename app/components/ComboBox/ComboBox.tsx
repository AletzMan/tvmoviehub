"use client"
import { ChangeEventHandler } from "react"
import styles from "./combobox.module.scss"

export interface IPropertiesCombobox {
    option: string | number
    value: string
}

interface Props {
    properties: IPropertiesCombobox[]
    onChange?: ChangeEventHandler<HTMLSelectElement>
    defaultValue?: string
    label?: string
    name?: string
}

export const ComboBox = ({ properties, onChange, label, defaultValue, name }: Props) => {


    return (
        <div className={styles.combobox} >
            {label && <label className={styles.combobox_label} >{label}</label>}
            <select className={styles.select} onChange={onChange} value={defaultValue} name={name}>
                {properties.map((property, index) => (
                    <option key={property.option} className={styles.option} value={property.value}>{property.option}</option>
                ))}
            </select>
        </div>
    )
}