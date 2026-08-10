import { MouseEvent, MouseEventHandler } from "react"
import styles from "./checkbox.module.scss"
import { CheckOnlyIcon } from "@/app/utils/svg"

interface Props {
	id?: string
	label?: string
	name: string
	checkBoxOnChange?: MouseEventHandler<HTMLButtonElement>
	checked?: boolean
}

export function CheckBox({ label, checkBoxOnChange, checked }: Props) {
	return (
		<button type="button" className={styles.checkbox_label} onClick={checkBoxOnChange}>
			<div className={`${styles.checkbox_check} ${checked ? styles.checkbox_checkActive : ""}`}>
				<CheckOnlyIcon
					className={`${styles.checkbox_checkIcon} ${checked ? styles.checkbox_checkIconActive : ""}`}
				/>
			</div>
			<span className={styles.checkbox_text}>{label}</span>
		</button>
	)
}