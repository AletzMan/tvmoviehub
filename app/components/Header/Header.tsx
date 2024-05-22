

import Link from "next/link"
import styles from "./header.module.scss"


export default function Header() {

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <Link className={styles.header_link} href={'/movies'} title="">Peliculas</Link>
                <Link className={styles.header_link} href={'/series'} title="">Series</Link>
            </nav>
        </header>
    )
}