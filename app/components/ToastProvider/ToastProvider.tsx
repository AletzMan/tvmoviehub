"use client"

import { SnackbarProvider } from "notistack"

interface Props {
    children: JSX.Element
}
export function ToastProvider({ children }: Props) {

    return (
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4500}>
            {children}
        </SnackbarProvider>
    )
}