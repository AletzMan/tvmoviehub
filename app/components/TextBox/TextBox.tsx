import { ChangeEventHandler, useState } from "react"
import styles from "./styles.module.scss"
import { ViewIcon, ViewOffIcon } from "@/app/utils/svg"

interface Props {
    label?: string
    name?: string
    type: 'text' | 'password' | 'number'
    error: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    value?: string
}

export function TextBox({ label, name, type, error, onChange, value }: Props) {
    const [view, setView] = useState(false)

    const HandleView = () => {
        setView(prev => !prev)
    }

    return (
        <fieldset className={styles.textbox}>
            <label className={styles.textbox_label}>{label}</label>
            <input className={`${styles.textbox_input} ${error && styles.textbox_inputError}`} type={!view ? type : "text"} name={name} onChange={onChange} value={value}></input>
            {error && <label className={styles.textbox_error} >{error}</label>}
            {type === "password" &&
                <button type="button" className={styles.textbox_view} onClick={HandleView}>{!view ? <ViewIcon className={styles.textbox_viewIcon} /> : <ViewOffIcon className={styles.textbox_viewIcon} />}</button>
            }
        </fieldset>
    )
}