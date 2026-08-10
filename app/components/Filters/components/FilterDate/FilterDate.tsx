"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/app/components/Button/Button"
import { ArrowDownSolidIcon, ResetIcon, SuccessIcon } from "@/app/utils/svg"
import styles from "./filter.module.scss"

interface Props {
    nameParam: string
    nameView: string
    section: string
    isInline?: boolean
}

interface IDate {
    gte: string
    lte: string
}

const defaultDate: IDate = {
    gte: "",
    lte: ""
}

export function FilterDate({ nameParam, nameView, section, isInline = false }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState<IDate>(defaultDate)
    const [error, setError] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const whitParamGte = searchParams.get(`${nameParam}.gte`)
        const whitParamLte = searchParams.get(`${nameParam}.lte`)

        if (whitParamGte && whitParamLte) {
            setDate({ lte: whitParamLte, gte: whitParamGte })
        } else {
            setDate({ gte: "", lte: "" })
        }
    }, [searchParams, nameParam])

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Calcular posición del menú cuando se abre
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setMenuPosition({
                top: rect.bottom + 8,
                left: rect.left
            })
        }
    }, [isOpen])

    const HandleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...date }
        if (e.currentTarget.name === 'gte') {
            setDate({ ...newValues, gte: e.currentTarget.value })
        } else {
            setDate({ ...newValues, lte: e.currentTarget.value })
        }
        setError(false)
    }

    const HandleApplyFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString())

        if (date.lte === "" && date.gte === "") {
            newSearchParams.delete(`${nameParam}.gte`)
            newSearchParams.delete(`${nameParam}.lte`)
            setError(false)
        } else if (date.gte !== "" && date.lte !== "") {
            newSearchParams.set(`${nameParam}.gte`, date.gte)
            newSearchParams.set(`${nameParam}.lte`, date.lte)
            const filterYear = section === "movies" ? "primary_release_year" : "first_air_date_year"
            newSearchParams.set("sort_by", "primary_release_date.asc")
            newSearchParams.delete(filterYear)
        } else {
            setError(true)
            return
        }

        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
    }

    const HandleResetFilter = () => {
        setDate({ gte: "", lte: "" })
        setError(false)
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(`${nameParam}.gte`)
        newSearchParams.delete(`${nameParam}.lte`)
        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
    }

    const isActive = date.gte !== "" && date.lte !== ""

    if (isInline) {
        return (
            <div className={styles.inlineContainer}>
                <div className={styles.options}>
                    <label className={styles.options_label}>
                        Desde
                        <input
                            className={styles.options_input}
                            name="gte"
                            type="date"
                            onChange={HandleChangeFilter}
                            value={date.gte}
                        />
                    </label>
                    <label className={styles.options_label}>
                        Hasta
                        <input
                            className={`${styles.options_input} ${error ? styles.options_inputError : ""}`}
                            min={date.gte}
                            name="lte"
                            type="date"
                            disabled={date.gte === ""}
                            onChange={HandleChangeFilter}
                            value={date.lte}
                        />
                        {error && <span className={styles.options_error}>Elige una fecha válida</span>}
                    </label>
                </div>
                <footer className={styles.footer}>
                    <Button
                        text="Limpiar"
                        isSecondary
                        icon={<ResetIcon />}
                        onClick={HandleResetFilter}
                        mode="button"
                    />
                    <Button
                        text="Aplicar"
                        icon={<SuccessIcon />}
                        onClick={HandleApplyFilter}
                        mode="button"
                    />
                </footer>
            </div>
        )
    }

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button
                type="button"
                className={`${styles.trigger} ${isOpen ? styles.triggerActive : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                ref={triggerRef}
            >
                <span className={styles.triggerTitle}>{nameView}</span>
                {isActive && (
                    <span className={styles.badge}>1</span>
                )}
                <ArrowDownSolidIcon className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} />
            </button>

            {isOpen && (
                <div 
                    className={styles.menu}
                    style={{
                        position: 'fixed',
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`
                    }} >
                    <div className={styles.options}>
                        <label className={styles.options_label}>
                            Desde
                            <input
                                className={styles.options_input}
                                name="gte"
                                type="date"
                                onChange={HandleChangeFilter}
                                value={date.gte}
                            />
                        </label>
                        <label className={styles.options_label}>
                            Hasta
                            <input
                                className={`${styles.options_input} ${error ? styles.options_inputError : ""}`}
                                min={date.gte}
                                name="lte"
                                type="date"
                                disabled={date.gte === ""}
                                onChange={HandleChangeFilter}
                                value={date.lte}
                            />
                            {error && <span className={styles.options_error}>Elige una fecha válida</span>}
                        </label>
                    </div>
                    <footer className={styles.footer}>
                        <Button
                            text="Limpiar"
                            isSecondary
                            icon={<ResetIcon />}
                            onClick={HandleResetFilter}
                            mode="button"
                        />
                        <Button
                            text="Aplicar"
                            icon={<SuccessIcon />}
                            onClick={HandleApplyFilter}
                            mode="button"
                        />
                    </footer>
                </div>
            )}
        </div>
    )
}