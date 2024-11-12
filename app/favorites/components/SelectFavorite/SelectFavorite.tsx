"use client"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useRouter, useSearchParams } from "next/navigation"

export default function SelectFavorite() {
    const [option, setOption] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const paramType = searchParams.get("type")
        if (paramType && paramType === "series") {
            setOption(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const HandleSetOption = () => {
        setOption(prev => !prev)
        router.push(option ? "?type=movies" : "?type=series")
    }

    return (
        <div className={styles.favorite}>
            <div className={styles.favorite_container}>
                <span className={`${styles.favorite_arrow} ${option && styles.favorite_arrowActive}`} >{option ? "Películas" : "Series"}</span>
                <button className={`${styles.favorite_button} ${option && styles.favorite_buttonActive}`} onClick={HandleSetOption}>{!option ? "Películas" : "Series"}</button>
            </div>
        </div>
    )
}