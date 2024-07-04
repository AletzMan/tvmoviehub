import { MouseEvent, ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react"
import styles from "./checkbox.module.scss"
import { CheckOnlyIcon } from "@/app/utils/svg"

interface Props {
	id?: string
	label?: string
	name: string
	checkBoxOnChange?: MouseEventHandler<HTMLButtonElement>
	checked?: boolean
}

export function CheckBox({ label, name, checkBoxOnChange, id, checked }: Props) {
	const [currentCheck, setCurrentCheck] = useState(checked)

	useEffect(() => {
		setCurrentCheck(checked)
	}, [checked, checkBoxOnChange])

	const HandleChange = (e: MouseEvent<HTMLButtonElement>) => {
		setCurrentCheck(prev => !prev)
		if (checkBoxOnChange)
			checkBoxOnChange(e)
	}

	return (
		<button className={styles.checkbox_label} onClick={HandleChange} >
			{label}
			<div className={`${styles.checkbox_check}  ${checked && styles.checkbox_checkActive}`} >
				<CheckOnlyIcon
					className={`${styles.checkbox_checkIcon} ${checked && styles.checkbox_checkIconActive} `}
				/>
			</div>
		</button>
	)
}
