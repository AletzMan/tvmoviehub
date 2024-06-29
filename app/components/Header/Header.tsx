
"use client"
import Link from "next/link"
import styles from "./header.module.scss"
import { MainMenu } from "@/app/utils/const"
import { usePathname } from "next/navigation"
import { SearchInput } from "../SearchInput/SearchInput"


export default function Header() {
    const pathname = usePathname()
    const section = pathname.split("/")[1]
    return (
        <header className={styles.header}>
            <div className={styles.header_pathname}>
                {MainMenu.find(menu => menu.link === section)?.icon}
                {MainMenu.find(menu => menu.link === section)?.name}
            </div>
            <div className={styles.header_search}>
                <SearchInput section={section} />
            </div>
        </header>
    )
}