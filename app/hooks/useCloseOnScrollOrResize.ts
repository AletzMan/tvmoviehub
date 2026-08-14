"use client"
import { useEffect, useCallback } from "react"

export const useCloseOnScrollOrResize = (closeCallback: () => void, isActive: boolean) => {
    const handleClose = useCallback(() => {
        if (isActive) {
            closeCallback()
        }
    }, [closeCallback, isActive])

    useEffect(() => {
        if (!isActive) return

        const handleScroll = () => handleClose()
        const handleResize = () => handleClose()
        const handleBlur = () => handleClose()

        window.addEventListener("scroll", handleScroll, true)
        window.addEventListener("resize", handleResize)
        window.addEventListener("blur", handleBlur)

        return () => {
            window.removeEventListener("scroll", handleScroll, true)
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("blur", handleBlur)
        }
    }, [isActive, handleClose])
}
