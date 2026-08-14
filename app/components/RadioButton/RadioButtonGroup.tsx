"use client"

import { ChangeEvent } from "react"
import styles from "./radiobuttongroup.module.scss"

interface Option {
    id: string
    label: string
}

interface Props {
    options: Option[]
    name: string
    selectedValue: string
    onChange: (value: string) => void
}

export function RadioButtonGroup({ options, name, selectedValue, onChange }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.id)
    }

    return (
        <div className={styles.radiobutton_group}>
            {options.map((option) => (
                <label
                    key={option.id}
                    className={`${styles.radiobutton_label} ${selectedValue === option.id ? styles.radiobutton_labelActive : ""}`}
                    htmlFor={option.id}
                >
                    <input
                        className={styles.radiobutton_input}
                        type="radio"
                        name={name}
                        id={option.id}
                        onChange={handleChange}
                        checked={selectedValue === option.id}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    )
}
