/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { LoadingIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLoadingState } from "@/app/services/store"

export function LoadingPage() {
    const { loadingState, setLoadingState } = useLoadingState()
    const pathname = usePathname()

    useEffect(() => {
        if (loadingState)
            setLoadingState(false)
    }, [pathname])

    return (
        <>
            {loadingState &&
                <dialog open className={styles.dialog}>
                    <div className={styles.dialog_container}>
                        <LoadingIcon className={styles.dialog_icon} />
                        <span className={styles.dialog_text}>CARGANDO</span>
                    </div>
                </dialog>
            }
        </>
    )
}