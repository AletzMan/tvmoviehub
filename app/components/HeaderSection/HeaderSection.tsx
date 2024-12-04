"use client"
import { useSearchParams } from "next/navigation"
import styles from "./styles.module.scss"

interface Props {
    title: string
    icon?: JSX.Element
    children?: JSX.Element
}

export function HeaderSection({ title, icon, children }: Props) {
    const searchParams = useSearchParams()

    return (
        <header className={styles.header}>
            <div className={styles.header_div}>
                <h3 className={styles.header_title}>{title}</h3>
                {searchParams.get("query") && <span className={styles.header_search}>{`"${searchParams.get("query")}"`}</span>}
            </div>
            <span className={styles.header_icon}>
                {children}
                {icon}
            </span>
        </header>
    )
}