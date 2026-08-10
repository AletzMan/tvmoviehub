"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./wheelpicker.module.scss"

interface WheelItem {
    label: string
    value: string
}

interface Props {
    items: WheelItem[]
    value: string
    onChange: (value: string) => void
    height?: number
}

export function WheelPicker({ items, value, onChange, height = 200 }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [currentScroll, setCurrentScroll] = useState(0)
    const [velocity, setVelocity] = useState(0)
    const [lastY, setLastY] = useState(0)
    const [lastTime, setLastTime] = useState(0)
    const animationRef = useRef<number | undefined>(undefined)
    const wheelTimeoutRef = useRef<number | undefined>(undefined)
    const itemHeight = 40
    const centerOffset = height / 2 - itemHeight / 2

    const selectedIndex = items.findIndex(item => item.value === value)

    useEffect(() => {
        if (contentRef.current && selectedIndex >= 0) {
            const targetScroll = -selectedIndex * itemHeight + centerOffset
            contentRef.current.style.transform = `translateY(${targetScroll}px)`
            setCurrentScroll(targetScroll)
        }
    }, [selectedIndex, itemHeight, centerOffset])

    const scrollToItem = (index: number) => {
        const targetScroll = -index * itemHeight + centerOffset
        if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${targetScroll}px)`
        }
        setCurrentScroll(targetScroll)
        if (items[index]) {
            onChange(items[index].value)
        }
    }

    const handleStart = (clientY: number) => {
        setIsDragging(true)
        setStartY(clientY)
        setLastY(clientY)
        setLastY(clientY)
        setLastTime(Date.now())
        setVelocity(0)
        if (animationRef.current !== undefined) {
            cancelAnimationFrame(animationRef.current)
        }
    }

    const handleMove = (clientY: number) => {
        if (!isDragging) return
        const deltaY = clientY - lastY
        const currentTime = Date.now()
        const deltaTime = currentTime - lastTime

        const newVelocity = deltaY / Math.max(deltaTime, 1)
        setVelocity(newVelocity)

        const newScroll = Math.max(
            -(items.length - 1) * itemHeight + centerOffset,
            Math.min(centerOffset, currentScroll + deltaY)
        )

        if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${newScroll}px)`
        }
        setCurrentScroll(newScroll)
        setLastY(clientY)
        setLastTime(currentTime)
    }

    const handleEnd = () => {
        setIsDragging(false)

        // Apply momentum
        let momentumScroll = currentScroll
        let momentumVelocity = velocity

        const animate = () => {
            momentumScroll += momentumVelocity
            momentumVelocity *= 0.95 // Friction

            const maxScroll = -(items.length - 1) * itemHeight + centerOffset
            momentumScroll = Math.max(maxScroll, Math.min(centerOffset, momentumScroll))

            if (contentRef.current) {
                contentRef.current.style.transform = `translateY(${momentumScroll}px)`
            }

            if (Math.abs(momentumVelocity) > 0.1) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                // Snap to nearest item
                const index = Math.round(-(momentumScroll - centerOffset) / itemHeight)
                scrollToItem(Math.max(0, Math.min(items.length - 1, index)))
            }
        }

        animate()
    }

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY
        const newScroll = Math.max(
            -(items.length - 1) * itemHeight + centerOffset,
            Math.min(centerOffset, currentScroll + delta)
        )

        if (contentRef.current) {
            contentRef.current.style.transform = `translateY(${newScroll}px)`
        }
        setCurrentScroll(newScroll)

        // Debounce snap
        if (animationRef.current !== undefined) {
            cancelAnimationFrame(animationRef.current)
        }

        if (wheelTimeoutRef.current !== undefined) {
            clearTimeout(wheelTimeoutRef.current)
        }

        wheelTimeoutRef.current = window.setTimeout(() => {
            const index = Math.round(-(newScroll - centerOffset) / itemHeight)
            scrollToItem(Math.max(0, Math.min(items.length - 1, index)))
        }, 100)
    }

    const handleClick = (index: number) => {
        scrollToItem(index)
    }

    const handlePrev = () => {
        const currentIndex = selectedIndex >= 0 ? selectedIndex : 0
        if (currentIndex > 0) {
            scrollToItem(currentIndex - 1)
        }
    }

    const handleNext = () => {
        const currentIndex = selectedIndex >= 0 ? selectedIndex : 0
        if (currentIndex < items.length - 1) {
            scrollToItem(currentIndex + 1)
        }
    }

    return (
        <div className={styles.wheelContainer}>
            <button
                type="button"
                className={`${styles.arrowButton} ${styles.arrowUp}`}
                onClick={handlePrev}
                disabled={selectedIndex <= 0}
                aria-label="Anterior"
            >
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0" />
                </svg>
            </button>
            <div className={styles.wheelArea} style={{ height: `${height}px` }}>
                <div
                    ref={containerRef}
                    className={styles.wheel}
                    style={{ height: `${height}px` }}
                    onWheel={handleWheel}
                >
                    <div
                        ref={contentRef}
                        className={styles.wheelContent}
                        onPointerDown={(e) => {
                            handleStart(e.clientY)
                            e.currentTarget.setPointerCapture(e.pointerId)
                        }}
                        onPointerMove={(e) => {
                            handleMove(e.clientY)
                        }}
                        onPointerUp={(e) => {
                            handleEnd()
                            e.currentTarget.releasePointerCapture(e.pointerId)
                        }}
                        onPointerLeave={(e) => {
                            if (isDragging) {
                                handleEnd()
                                e.currentTarget.releasePointerCapture(e.pointerId)
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.value}
                                className={`${styles.wheelItem} ${item.value === value ? styles.wheelItemSelected : ""}`}
                                style={{ height: `${itemHeight}px` }}
                                onClick={() => handleClick(index)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.selectionLine}></div>
                <div className={styles.overlay}></div>
            </div>
            <button
                type="button"
                className={`${styles.arrowButton} ${styles.arrowDown}`}
                onClick={handleNext}
                disabled={selectedIndex >= items.length - 1}
                aria-label="Siguiente"
            >
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0" />
                </svg>
            </button>
        </div>
    )
}
