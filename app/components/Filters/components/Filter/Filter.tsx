"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/app/components/Button/Button"
import { ArrowDownSolidIcon, ResetIcon, SuccessIcon } from "@/app/utils/svg"
import styles from "./filter.module.scss"

interface IOptions {
    option: string
    value: string
}

interface Props {
    properties: IOptions[]
    nameParam: string
    nameView: string
    isInline?: boolean
    onCountChange?: (count: number) => void
    onApply?: () => void
    onPendingChange?: (pending: boolean, key: string) => void
    onRegisterValue?: (value: any, key: string) => void
    filterKey?: string
}

export function Filter({ properties, nameParam, nameView, isInline = false, onCountChange, onApply, onPendingChange, onRegisterValue, filterKey }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [valuesActive, setValuesActive] = useState<boolean[]>(
        new Array(properties.length).fill(false)
    )

    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const whitParam = searchParams.get(nameParam)
        if (whitParam) {
            const values = whitParam.split(",")
            const newValues = properties.map((prop) => values.includes(prop.value))
            setValuesActive(newValues)
        } else {
            setValuesActive(new Array(properties.length).fill(false))
        }
    }, [properties, searchParams, nameParam])

    const activeCount = valuesActive.filter(Boolean).length

    useEffect(() => {
        onCountChange?.(activeCount)
    }, [activeCount, onCountChange])

    // Track if current state differs from URL params
    useEffect(() => {
        const whitParam = searchParams.get(nameParam)
        const currentValues = valuesActive
            .map((active, index) => active ? properties[index].value : null)
            .filter(Boolean)
            .join(",")
        
        const hasPending = currentValues !== (whitParam || "")
        onPendingChange?.(hasPending, filterKey || "")
    }, [valuesActive, searchParams, nameParam, properties, onPendingChange, filterKey])

    // Cerrar el dropdown al hacer clic fuera
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

    const HandleChangeFilter = (index: number) => {
        const newsValues = [...valuesActive]
        newsValues[index] = !newsValues[index]
        setValuesActive(newsValues)
    }

    const HandleApplyFilter = useCallback(() => {
        const selectOptions = properties
            .filter((_, index) => valuesActive[index])
            .map(option => option.value)
            .join(",")

        const newSearchParams = new URLSearchParams(searchParams.toString())

        if (selectOptions) {
            newSearchParams.set(nameParam, selectOptions)
        } else {
            newSearchParams.delete(nameParam)
        }

        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
        onApply?.()
    }, [valuesActive, properties, searchParams, nameParam, pathname, router, onApply])

    // Register current value with parent
    useEffect(() => {
        if (onRegisterValue && filterKey) {
            const selectOptions = valuesActive
                .map((active, index) => active ? properties[index].value : null)
                .filter(Boolean)
                .join(",")
            onRegisterValue(selectOptions, filterKey)
        }
    }, [valuesActive, properties, onRegisterValue, filterKey])

    const HandleResetFilter = () => {
        setValuesActive(new Array(properties.length).fill(false))
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(nameParam)
        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
    }

    if (isInline) {
        return (
            <div className={styles.inlineContainer}>
                <div className={`${styles.tagsContainer} `}>
                    {properties.map((category, index) => (
                        <button
                            key={category.value}
                            type="button"
                            className={`${styles.tag} ${valuesActive[index] ? styles.tagActive : ""}`}
                            onClick={() => HandleChangeFilter(index)}
                        >
                            {category.option}
                        </button>
                    ))}
                </div>
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
                {activeCount > 0 && (
                    <span className={styles.badge}>{activeCount}</span>
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
                    }}
                >
                    <div className={`${styles.tagsContainer} scrollBarStyle`}>
                        {properties.map((category, index) => (
                            <button
                                key={category.value}
                                type="button"
                                className={`${styles.tag} ${valuesActive[index] ? styles.tagActive : ""}`}
                                onClick={() => HandleChangeFilter(index)}
                            >
                                {category.option}
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