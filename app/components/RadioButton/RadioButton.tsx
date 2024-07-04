import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useState } from "react"
import styles from "./radiobutton.module.scss"
import { CheckOnlyIcon } from "@/app/utils/svg"

interface Props {
	id?: string
	label?: string
	name: string
	checkBoxOnChange?: ChangeEventHandler<HTMLInputElement>
	checked?: boolean
}

export function RadioButton({ label, name, checkBoxOnChange, id, checked }: Props) {


	return (
		<label className={styles.checkbox_label} htmlFor={id}>
			<input className={styles.checkbox} type="radio" name={name} id={id} onChange={checkBoxOnChange} checked={checked} />
			{label}
			<div className={`${styles.checkbox_check}  ${checked && styles.checkbox_checkActive}`}>
				<CheckOnlyIcon
					className={`${styles.checkbox_checkIcon} ${checked && styles.checkbox_checkIconActive} `}
				/>
			</div>
		</label>

	)
}
