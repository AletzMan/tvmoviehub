"use client"
import { ChangeEvent, MouseEventHandler, useState, MouseEvent } from "react"
import styles from "./styles.module.scss"
import { TextBox } from "@/app/components/TextBox/TextBox"
import { Button } from "@/app/components/Button/Button"
import { CreateList } from "@/app/services/fetchData"
import { useSession } from "@/app/hooks/useSession"
import { RevalidateURL } from "@/app/utils/serveractions"
import { CloseIcon, SaveIcon } from "@/app/utils/svg"


interface IList {
    name: string
    description: string
}

export function FormAddMovie() {
    const { session_id } = useSession()
    const [list, setList] = useState<IList>({ name: "", description: "" })
    const [errorList, setErrorList] = useState<IList>({ name: "", description: "" })

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setList({ ...list, [name]: value })
        setErrorList({ ...errorList, [name]: "" })
    }


    const HandleSave = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (list.name === "" || list.description === "") {
            const errorName = list.name === "" ? "Campo requerido" : ""
            const errorDescription = list.description === "" ? "Campo requerido" : ""
            setErrorList({ name: errorName, description: errorDescription })
        } else {
            const response = await CreateList(session_id, list.name, list.description)
            if (response) {
                RevalidateURL("listMovies")
            }
        }
    }

    return (
        <form className={styles.dialog_form} >
            <h3 className={styles.dialog_title}>Crear lista</h3>
            <TextBox
                error={errorList.name}
                type="text"
                name="name"
                label="Nombre"
                value={list.name}
                onChange={HandleChange} />
            <TextBox
                error={errorList.description}
                type="text"
                name="description"
                label="Descripción"
                value={list.description}
                onChange={HandleChange} />
            <fieldset className={styles.dialog_buttons}>
                <Button
                    mode="button"
                    text="Guardar"
                    icon={<SaveIcon />}
                    onClick={HandleSave} />
            </fieldset>
        </form>
    )
}