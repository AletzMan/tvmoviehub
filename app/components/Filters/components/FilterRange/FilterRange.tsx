"use client"

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/app/components/Button/Button"
import { ArrowDownSolidIcon, ResetIcon, SuccessIcon } from "@/app/utils/svg"
import styles from "./filter.module.scss"

interface Props {
    nameParam: string
    nameView: string
    section: string
    min?: number
    max?: number
    step?: number
    singleValue?: boolean
    isInline?: boolean
    onActiveChange?: (isActive: boolean) => void
    onApply?: () => void
    onPendingChange?: (pending: boolean, key: string) => void
    onRegisterValue?: (value: any, key: string) => void
    filterKey?: string
}

interface IRange {
    gte: number
    lte: number
}

export function FilterRange({ nameParam, nameView, min = 0, max = 10, step = 1, singleValue = false, isInline = false, onActiveChange, onApply, onPendingChange, onRegisterValue, filterKey }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [range, setRange] = useState<IRange>({ gte: min, lte: max })

    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const isActive = singleValue ? range.gte !== min : range.gte !== min || range.lte !== max

    useEffect(() => {
        onActiveChange?.(isActive)
    }, [isActive, onActiveChange])

    useEffect(() => {
        const whitParamGte = searchParams.get(`${nameParam}.gte`)
        const whitParamLte = singleValue ? null : searchParams.get(`${nameParam}.lte`)

        setRange({
            gte: whitParamGte ? Number(whitParamGte) : min,
            lte: whitParamLte ? Number(whitParamLte) : max
        })
    }, [searchParams, nameParam, min, max, singleValue])

    // Track if current state differs from URL params
    useEffect(() => {
        const whitParamGte = searchParams.get(`${nameParam}.gte`)
        const whitParamLte = singleValue ? null : searchParams.get(`${nameParam}.lte`)
        
        const currentGte = range.gte.toString()
        const currentLte = range.lte.toString()
        
        const hasPending = currentGte !== (whitParamGte || "") || (!singleValue && currentLte !== (whitParamLte || ""))
        onPendingChange?.(hasPending, filterKey || "")
    }, [range, searchParams, nameParam, singleValue, onPendingChange, filterKey])

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

    const HandleChangeGte = (e: ChangeEvent<HTMLInputElement>) => {
        const value = singleValue ? Number(e.target.value) : Math.min(Number(e.target.value), range.lte - step)
        setRange(prev => ({ ...prev, gte: value }))
    }

    const HandleChangeLte = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), range.gte + step)
        setRange(prev => ({ ...prev, lte: value }))
    }

    const HandleApplyFilter = useCallback(() => {
        const newSearchParams = new URLSearchParams(searchParams.toString())

        if (singleValue) {
            if (range.gte === min) {
                newSearchParams.delete(`${nameParam}.gte`)
            } else {
                newSearchParams.set(`${nameParam}.gte`, range.gte.toString())
            }
        } else {
            if (range.gte === min && range.lte === max) {
                newSearchParams.delete(`${nameParam}.gte`)
                newSearchParams.delete(`${nameParam}.lte`)
            } else {
                if (range.gte !== min) {
                    newSearchParams.set(`${nameParam}.gte`, range.gte.toString())
                } else {
                    newSearchParams.delete(`${nameParam}.gte`)
                }

                if (range.lte !== max) {
                    newSearchParams.set(`${nameParam}.lte`, range.lte.toString())
                } else {
                    newSearchParams.delete(`${nameParam}.lte`)
                }
            }
        }

        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
        onApply?.()
    }, [range, searchParams, nameParam, min, max, singleValue, pathname, router, onApply])

    // Register current value with parent
    useEffect(() => {
        if (onRegisterValue && filterKey) {
            onRegisterValue(range, filterKey)
        }
    }, [range, onRegisterValue, filterKey])

    const HandleResetFilter = () => {
        setRange({ gte: min, lte: max })
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(`${nameParam}.gte`)
        if (!singleValue) {
            newSearchParams.delete(`${nameParam}.lte`)
        }
        router.push(`${pathname}?${newSearchParams.toString()}`)
        setIsOpen(false)
    }

    // Cálculo porcentual para la barra de progreso interna del slider
    const minPercent = ((range.gte - min) / (max - min)) * 100
    const maxPercent = ((range.lte - min) / (max - min)) * 100

    if (isInline) {
        return (
            <div className={styles.inlineContainer}>
                <div className={styles.content}>
                    <div className={styles.valuesDisplay}>
                        <span>{range.gte}</span>
                        {!singleValue && (
                            <>
                                <span className={styles.separator}>-</span>
                                <span>{range.lte}</span>
                            </>
                        )}
                    </div>

                    <div className={styles.sliderWrapper}>
                        <div className={styles.sliderContainer}>
                            <div className={styles.sliderTrack} />
                            {!singleValue && (
                                <div
                                    className={styles.sliderRange}
                                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                                />
                            )}
                            <input
                                type="range"
                                min={min}
                                max={max}
                                step={step}
                                value={range.gte}
                                onChange={HandleChangeGte}
                                className={styles.rangeInput}
                            />
                            {!singleValue && (
                                <input
                                    type="range"
                                    min={min}
                                    max={max}
                                    step={step}
                                    value={range.lte}
                                    onChange={HandleChangeLte}
                                    className={styles.rangeInput}
                                />
                            )}
                        </div>

                        <div className={styles.sliderLabels}>
                            <span className={styles.sliderLabelItem}>{min}</span>
                            <span className={`${styles.sliderLabelItem} ${styles.sliderLabelCenter}`}>{Math.round((min + max) / 2)}</span>
                            <span className={styles.sliderLabelItem}>{max}</span>
                        </div>
                    </div>
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
                    <div className={styles.content}>
                        <div className={styles.valuesDisplay}>
                            <span>{range.gte}</span>
                            {!singleValue && (
                                <>
                                    <span className={styles.separator}>-</span>
                                    <span>{range.lte}</span>
                                </>
                            )}
                        </div>

                        <div className={styles.sliderWrapper}>
                            <div className={styles.sliderContainer}>
                                <div className={styles.sliderTrack} />
                                {!singleValue && (
                                    <div
                                        className={styles.sliderRange}
                                        style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                                    />
                                )}
                                <input
                                    type="range"
                                    min={min}
                                    max={max}
                                    step={step}
                                    value={range.gte}
                                    onChange={HandleChangeGte}
                                    className={styles.rangeInput}
                                />
                                {!singleValue && (
                                    <input
                                        type="range"
                                        min={min}
                                        max={max}
                                        step={step}
                                        value={range.lte}
                                        onChange={HandleChangeLte}
                                        className={styles.rangeInput}
                                    />
                                )}
                            </div>

                            {/* Etiquetas integradas perfectamente al ancho exacto del slider */}
                            <div className={styles.sliderLabels}>
                                <span className={styles.sliderLabelItem}>{min}</span>
                                <span className={`${styles.sliderLabelItem} ${styles.sliderLabelCenter}`}>{Math.round((min + max) / 2)}</span>
                                <span className={styles.sliderLabelItem}>{max}</span>
                            </div>
                        </div>
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