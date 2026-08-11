"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/app/components/Button/Button"
import { ArrowDownSolidIcon, ResetIcon } from "@/app/utils/svg"
import styles from "./filter.module.scss"

interface Props {
    properties: IPropertiesCombobox[]
    nameParam: string
    nameView: string
    section: string
    isInline?: boolean
}

interface IPropertiesCombobox {
    option: string | number
    value: string
}

export function FilterComboBox({ nameParam, nameView, properties, isInline = false }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()
    const [data, setData] = useState<string | null>(searchParams.get(nameParam))

    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const whitParam = searchParams.get(nameParam)
        if (whitParam) {
            setData(whitParam)
        } else {
            setData("")
        }
    }, [searchParams, nameParam])

    // Cerrar al hacer clic fuera del dropdown
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

    const HandleChangeFilter = (option: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set(nameParam, option)
        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
    }

    const HandleResetFilter = () => {
        setData("")
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(nameParam)
        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
    }

    const isActive = Boolean(data && data !== "")

    if (isInline) {
        return (
            <div className={styles.inlineContainer}>
                <div className={`${styles.options} scrollBarStyle`}>
                    {properties.map(property => (
                        <button
                            key={property.value}
                            type="button"
                            className={`${styles.combobox_option} ${data === property.option.toString() ? styles.combobox_optionActive : ""}`}
                            onClick={() => HandleChangeFilter(property.option.toString())}
                        >
                            {property.option}
                        </button>
                    ))}
                </div>
                <footer className={styles.footer}>
                    <Button
                        text="Limpiar"
                        isSecondary
                        icon={<ResetIcon />}
                        onClick={HandleResetFilter}
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
                <span className={styles.triggerTitle}>
                    {isActive ? `${nameView}: ${data}` : nameView}
                </span>
                {isActive && (
                    <span className={styles.activeBadge}>
                        <span className={styles.activeDot} />
                        Activo
                    </span>
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
                    <div className={`${styles.options} scrollBarStyle`}>
                        {properties.map(property => (
                            <button
                                key={property.value}
                                type="button"
                                className={`${styles.combobox_option} ${data === property.option.toString() ? styles.combobox_optionActive : ""}`}
                                onClick={() => HandleChangeFilter(property.option.toString())}
                            >
                                {property.option}
                            </button>
                        ))}
                    </div>
                    <footer className={styles.footer}>
                        <Button
                            text="Limpiar"
                            isSecondary
                            icon={<ResetIcon />}
                            onClick={HandleResetFilter}
                            mode="button"
                        />
                    </footer>
                </div>
            )}
        </div>
    )
}