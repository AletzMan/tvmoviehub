"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./filteraccordion.module.scss"
import { ArrowDownIcon, ArrowDownSolidIcon } from "@/app/utils/svg"

interface Props {
    title: string
    defaultOpen?: boolean
    badgeCount?: number
    isActive?: boolean
    children: React.ReactNode
}

export function FilterAccordion({ title, defaultOpen = false, badgeCount, isActive, children }: Props) {
    const [isOpen, setIsOpen] = useState(true)
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(defaultOpen ? "auto" : "0px")

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                setHeight(`${contentRef.current.scrollHeight}px`)
                // Transition to auto after animation completes
                const timeout = setTimeout(() => {
                    setHeight("auto")
                }, 300)
                return () => clearTimeout(timeout)
            } else {
                setHeight(`${contentRef.current.scrollHeight}px`)
                // Small delay to allow transition from auto to px
                requestAnimationFrame(() => {
                    setHeight("0px")
                })
            }
        }
    }, [isOpen])

    const toggle = () => setIsOpen(!isOpen)

    return (
        <div className={styles.accordion}>
            <button
                className={styles.accordionHeader}
                //onClick={toggle}
                aria-expanded={true}
            >
                <div className={styles.titleWrapper}>
                    <span className={styles.accordionTitle}>{title}</span>
                    {badgeCount !== undefined && badgeCount > 0 && (
                        <span className={styles.countBadge}>{badgeCount}</span>
                    )}
                    {isActive && (badgeCount === undefined || badgeCount === 0) && (
                        <span className={styles.activeBadge}>
                            <span className={styles.activeDot} />
                        </span>
                    )}
                </div>
                {/* <span className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}>
                    <ArrowDownSolidIcon />
                </span>*/}
            </button>
            <div
                ref={contentRef}
                className={styles.accordionContent}
                style={{ maxHeight: height }}
            >
                <div className={styles.accordionInner}>
                    {children}
                </div>
            </div>
        </div>
    )
}
