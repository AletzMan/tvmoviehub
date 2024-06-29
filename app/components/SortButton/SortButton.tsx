"use client"
import { SortDownIcon, SortUpIcon } from "@/app/utils/svg"
import styles from "./sortbutton.module.scss"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

export function SortButton() {
    const [sort, setSort] = useState<"asc" | "desc">("desc")
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const newSort = searchParams.get("sort_by")
        setSort(newSort?.split(".")[1] as "asc" | "desc")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const HandleChangeSort = () => {
        const currentSort = searchParams.get("sort_by")
        if (currentSort) {
            const newSort = sort === "asc" ? "desc" : "asc"
            setSort(newSort)

            const order = currentSort.split(".")[0]

            const newURL = new URLSearchParams(searchParams)
            newURL.set("sort_by", `${order}.${newSort}`)

            router.push(`${pathname}?${newURL.toString()}`)

        }
    }

    return (
        <button className={styles.button} onClick={HandleChangeSort}>
            {sort === "desc" && <SortDownIcon className={styles.button_icon} />}
            {sort === "asc" && <SortUpIcon className={styles.button_icon} />}
        </button>
    )
}