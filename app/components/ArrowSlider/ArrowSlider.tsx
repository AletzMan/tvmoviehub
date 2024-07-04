import { ArrowLeftIcon } from "@/app/utils/svg"
import { CSSProperties, MouseEventHandler } from "react"
import styles from "./style.module.scss"

interface IPropsArrow {
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler<HTMLDivElement>
}


export function NextArrow({ className, onClick, style }: IPropsArrow) {
    return (
        <div
            className={` ${styles.arrow}  ${styles.arrow_right}`}
            onClick={onClick}
        >
            <ArrowLeftIcon className={`${styles.arrow_icon} ${styles.arrow_iconRight}`} />
        </div>
    )
}

export function PrevArrow({ className, onClick, style }: IPropsArrow) {
    return (
        <div
            className={` ${styles.arrow}  ${styles.arrow_left}`}
            onClick={onClick}
        >
            <ArrowLeftIcon className={`${styles.arrow_icon} ${styles.arrow_iconLeft}`} />
        </div>
    )
}
