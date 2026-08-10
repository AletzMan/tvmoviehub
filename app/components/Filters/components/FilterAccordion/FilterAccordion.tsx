"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./filteraccordion.module.scss"

interface Props {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}

export function FilterAccordion({ title, defaultOpen = false, children }: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
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
                onClick={toggle}
                aria-expanded={isOpen}
            >
                <span className={styles.accordionTitle}>{title}</span>
                <span className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}>
                    ▼
                </span>
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
