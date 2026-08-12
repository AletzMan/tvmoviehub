"use client"
import { useRef, PointerEvent, useCallback } from "react"

export const useDragPreventClick = () => {
    const pointerPos = useRef({ x: 0, y: 0 })
    const isDraggingRef = useRef(false)
    const dragThreshold = 5 // Píxeles mínimos para considerar arrastre

    const handlePointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
        pointerPos.current = { x: e.clientX, y: e.clientY }
        isDraggingRef.current = false
    }, [])

    const handlePointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
        const dx = Math.abs(e.clientX - pointerPos.current.x)
        const dy = Math.abs(e.clientY - pointerPos.current.y)

        if (dx > dragThreshold || dy > dragThreshold) {
            isDraggingRef.current = true
        }
    }, [])

    const handleClick = useCallback((handler?: () => void) => {
        return () => {
            if (isDraggingRef.current) return
            if (handler) handler()
        }
    }, [])

    return {
        handlePointerDown,
        handlePointerMove,
        handleClick
    }
}
