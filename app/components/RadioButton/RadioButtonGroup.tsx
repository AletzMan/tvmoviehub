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
    return (
        <div className={styles.radiobutton_group}>
            {options.map((option) => {
                const inputId = `${name}-${option.id}`
                return (
                    <label
                        key={option.id}
                        className={`${styles.radiobutton_label} ${selectedValue === option.id ? styles.radiobutton_labelActive : ""}`}
                        htmlFor={inputId}
                    >
                        <input
                            className={styles.radiobutton_input}
                            type="radio"
                            name={name}
                            id={inputId}
                            value={option.id}
                            onChange={() => onChange(option.id)}
                            checked={selectedValue === option.id}
                        />
                        {option.label}
                    </label>
                )
            })}
        </div>
    )
}
