"use client";
import { SnackbarProvider } from "notistack"

import type { JSX } from "react";

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