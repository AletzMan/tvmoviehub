import { MouseEventHandler, type JSX } from "react";
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
    target?: '_blank' | '_parent' | '_self' | '_top'
    color?: 'danger' | 'success' | 'warning' | 'info' | 'primary' | 'secondary'
    variant?: 'solid' | 'outline' | 'text' | 'ghost'
}

export function Button({ text, icon, isSecondary, onClick, disabled, className, mode, href, target, color = 'primary', variant = 'solid' }: Props) {

    const colorClass = styles[`button_${color}`] || styles.button_primary
    const variantClass = styles[`button_${variant}`] || styles.button_solid

    return (
        <>
            {mode === "button" &&
                <button className={`${styles.button} ${isSecondary && styles.button_secondary} ${!isSecondary && colorClass} ${variantClass} ${className}`} onClick={onClick} disabled={disabled}>
                    {icon}
                    {text}
                </button>
            }
            {mode === "link" &&
                <Link className={`${styles.button} ${isSecondary && styles.button_secondary} ${!isSecondary && colorClass} ${variantClass} ${className}`} href={href || ""} aria-disabled={disabled} target={target}>
                    {icon}
                    {text}
                </Link>
            }
        </>
    )
}