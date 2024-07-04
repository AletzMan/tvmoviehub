"use client"
import { IKeywords } from "@/app/interfaces/keyword"
import styles from "./styles.module.scss"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    keywords: IKeywords
}

export function SectionTags({ keywords }: Props) {
    const [section, setSection] = useState<"series" | "movies">("series")
    const pathname = usePathname()

    useEffect(() => {
        const currentSection = pathname.split("/")[1] as "series" | "movies"
        setSection(currentSection)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.tags}>
            <h3 className={styles.tags_title}>Palabras clave</h3>
            <div className={styles.keywords}>
                {keywords.keywords?.map(keyword => (
                    <Link key={keyword.id} href={`/${section}/results/list?with_keywords=${keyword.id}`} className={styles.keywords_word}>{keyword.name}</Link>
                ))
                }
                {keywords.results?.map(keyword => (
                    <Link key={keyword.id} href={`/${section}/results/list?with_keywords=${keyword.id}`} className={styles.keywords_word}>{keyword.name}</Link>
                ))
                }
            </div>
        </div>
    )
}