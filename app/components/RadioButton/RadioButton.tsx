import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useState } from "react"
import styles from "./radiobutton.module.scss"

interface Props {
	id?: string
	label?: string
	name: string
	checkBoxOnChange?: ChangeEventHandler<HTMLInputElement>
	checked?: boolean
}

export function RadioButton({ label, name, checkBoxOnChange, id, checked }: Props) {


	return (
		<label className={`${styles.checkbox_label} ${checked && styles.checkbox_labelActive}`} htmlFor={id}>
			<input className={styles.checkbox} type="radio" name={name} id={id} onChange={checkBoxOnChange} checked={checked} />
			{label}
		</label>

	)
}
