'use client'
import { DeleteIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"
import { useDialogAlert } from "@/app/services/store"
import { IListMovie } from "@/app/interfaces/list"

interface Props {
    list: IListMovie
}

export function ButtonDeleteList({ list }: Props) {
    const { setItemToDelete, setTypeDialog, setViewDialog } = useDialogAlert()

    const HandleDeleteList = () => {
        setTypeDialog("list")
        setItemToDelete({ id: 0, list_id: list.id, name_item: list.name, name_list: list.name, text: ["¿Desea eliminar la lista?", ""] })
        setViewDialog(true)
    }

    return (
        <button className={styles.delete} onClick={HandleDeleteList}><DeleteIcon className={styles.delete_icon} /></button>
    )
}