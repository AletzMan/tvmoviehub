"use client"
import { Button } from "@/app/components/Button/Button"
import styles from "../styles.module.scss"
import { ClearIcon, DeleteIcon } from "@/app/utils/svg"
import { useDialogAlert } from "@/app/services/store"
import { IListDetails } from "@/app/interfaces/list"

interface Props {
    details_list: IListDetails
}

export function ButtonsList({ details_list }: Props) {
    const { setItemToDelete, setTypeDialog, setViewDialog } = useDialogAlert()

    const HandleClearList = () => {
        setTypeDialog('clearlist')
        setItemToDelete({ list_id: details_list.id, id: 0, name_item: details_list.name, name_list: details_list.name, text: ["¿Desea borrar los elementos de la lista?", ""] })
        setViewDialog(true)
    }

    return (
        <div className={styles.buttons}>
            <Button mode="button" text="Limpiar lista" icon={<ClearIcon />} onClick={HandleClearList} />
        </div>
    )
}