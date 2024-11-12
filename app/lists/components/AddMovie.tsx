"use client"
import { Button } from "@/app/components/Button/Button"
import styles from "./styles.module.scss"
import { AddIcon } from "@/app/utils/svg"
import { FormAddMovie } from "./FormAddMovie"
import { useState, MouseEvent } from "react"

export function AddMovie() {
    const [open, setOpen] = useState(false)

    const HandleSetOpen = (e: MouseEvent<HTMLButtonElement | HTMLDialogElement>) => {
        e.preventDefault()
        setOpen(prev => !prev)
    }

    return (
        <>
            <Button mode="button" text="Crear lista" icon={<AddIcon />} onClick={HandleSetOpen} />
            {open && <FormAddMovie onClick={HandleSetOpen} />}
        </>
    )
}