"use client"
import { NextPageIcon, PrevPageIcon } from "@/app/utils/svg"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import styles from "./pagination.module.scss"

interface IButtonPag {
    id: string
    page: string
}

interface Props {
    totalPages: number
    currentPage: number
    pathname?: string
    onClickPagination?: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onClickPagination }: Props) {
    const pathname = usePathname()
    const searchParamas = useSearchParams()
    const [buttons, setButtons] = useState<IButtonPag[]>()
    const params = new URLSearchParams(searchParamas).toString()
    let routeUrl = ""

    if (params.includes("page")) {
        routeUrl = `${pathname}?${params}`
    } else {
        routeUrl = (`${pathname}?${params}&page=1`)
    }

    useEffect(() => {
        let buttonsPag: IButtonPag[] = []
        const actualTotalPages = totalPages > 500 ? 500 : totalPages
        for (let index = 0; index < actualTotalPages; index++) {
            if (actualTotalPages <= 7) {
                const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                buttonsPag.push(buttonPag)
            } else {
                if (currentPage > 4 && currentPage < (actualTotalPages - 3)) {
                    if (index === 0) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 1 || index === 5) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: "..." }
                        buttonsPag.push(buttonPag)
                    } else if (index === actualTotalPages - 1) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (actualTotalPages).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 2) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (currentPage - 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 3) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (currentPage).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 4) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (currentPage + 1).toString() }
                        buttonsPag.push(buttonPag)
                    }
                } else if (currentPage >= (actualTotalPages - 3)) {
                    if (index >= (actualTotalPages - 5)) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === 1) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: "..." }
                        buttonsPag.push(buttonPag)
                    } else if (index === 0) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    }
                } else if (currentPage < 5) {
                    if (index < 5) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    } else if (index === (actualTotalPages - 2)) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: "..." }
                        buttonsPag.push(buttonPag)
                    } else if (index === (actualTotalPages - 1)) {
                        const buttonPag: IButtonPag = { id: crypto.randomUUID(), page: (index + 1).toString() }
                        buttonsPag.push(buttonPag)
                    }
                }

            }
        }
        setButtons(buttonsPag)
    }, [currentPage, params, totalPages])



    return (
        <nav className={styles.pagination}>
            {/*<Link className={`${styles.pagination_button} ${currentPage === 1 && styles.pagination_buttonInactive}`} href={`${pathname}?page=1`}><FirstPageIcon /></Link>*/}
            {!onClickPagination && <Link className={`${styles.pagination_button} ${currentPage === 1 && styles.pagination_buttonInactive}`} href={`${routeUrl.replace(/page=\d+/, `page=${currentPage - 1}`)}`}><PrevPageIcon className="" /></Link>}
            {onClickPagination && <button className={`${styles.pagination_button} ${currentPage === 1 && styles.pagination_buttonInactive}`} onClick={() => onClickPagination(currentPage - 1)}><PrevPageIcon className="" /></button>}
            {buttons?.map(button => (
                button.page !== "..."
                    ?
                    <Fragment key={button.id}>
                        {!onClickPagination && <Link className={`${styles.pagination_button} ${currentPage.toString() === button.page && styles.pagination_buttonCurrent}`} href={`${routeUrl.replace(/page=\d+/, `page=${button.page}`)}`}>{button.page}</Link>}                        { }
                        {onClickPagination && <button className={`${styles.pagination_button} ${currentPage.toString() === button.page && styles.pagination_buttonCurrent}`} onClick={() => onClickPagination(Number(button.page))}>{button.page}</button>}
                    </Fragment>
                    :
                    <button key={button.id} className={`${styles.pagination_button} ${styles.pagination_buttonInactive}`}>{button.page}</button>
            ))}
            {!onClickPagination && <Link className={`${styles.pagination_button} ${currentPage === totalPages && styles.pagination_buttonInactive}`} href={`${routeUrl.replace(/page=\d+/, `page=${currentPage + 1}`)}`}><NextPageIcon className="" /></Link>}
            {onClickPagination && <button className={`${styles.pagination_button} ${currentPage === totalPages && styles.pagination_buttonInactive}`} onClick={() => onClickPagination(currentPage + 1)}><NextPageIcon className="" /></button>}
            {/*<Link className={`${styles.pagination_button} ${currentPage === totalPages && styles.pagination_buttonInactive}`} href={`${pathname}?page=${totalPages}`}><LastPageIcon /></Link>*/}
        </nav>
    )
}