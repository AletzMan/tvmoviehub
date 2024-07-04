import { MouseEventHandler } from "react"
import styles from "./button.module.scss"
import Link from "next/link"

interface Props {
    text: string
    icon?: JSX.Element
    isSecondary?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    className?: string
    mode: 'button' | 'link'
    href?: string
}

export function Button({ text, icon, isSecondary, onClick, disabled, className, mode, href }: Props) {

    return (
        <>
            {mode === "button" &&
                <button className={`${styles.button} ${isSecondary && styles.button_secondary} ${className}`} onClick={onClick} disabled={disabled}>
                    {icon}
                    {text}
                </button>
            }
            {mode === "link" &&
                <Link className={`${styles.button} ${isSecondary && styles.button_secondary} ${className}`} href={href || ""} aria-disabled={disabled} target="_blank">
                    {icon}
                    {text}
                </Link>
            }
        </>
    )
}