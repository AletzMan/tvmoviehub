"use client"
import styles from "./styles.module.scss"

interface Props {
    title: string
    icon?: JSX.Element
    children?: JSX.Element
    query?: string
}


export function HeaderSection({ title, icon, children, query }: Props) {

    return (
        <header className={styles.header}>
            <div className={styles.header_div}>
                <h3 className={styles.header_title}>{title}</h3>
                {query && <span className={styles.header_search}>{`"${query}"`}</span>}
            </div>
            <span className={styles.header_icon}>
                {children}
                {icon}
            </span>
        </header>
    )
}