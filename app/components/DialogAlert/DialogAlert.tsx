/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { CheckOnlyIcon, CloseIcon } from "@/app/utils/svg"
import { Button } from "../Button/Button"
import styles from "./styles.module.scss"
import { useDialogAlert } from "@/app/services/store"
import { ClearList, DeleteList, RemoveItemFromList } from "@/app/services/fetchData"
import { useSession } from "@/app/hooks/useSession"
import { enqueueSnackbar } from "notistack"
import { RevalidateURL } from "@/app/utils/serveractions"


export function DialogAlert() {
    const { viewDialog, setViewDialog, itemToDelete, typeDialog } = useDialogAlert()
    const { session_id } = useSession()

    const HandleAcceptAction = async () => {
        if (typeDialog === 'item') {
            const response = await RemoveItemFromList(session_id, itemToDelete.list_id, itemToDelete.id)
            if (response?.status_code === 13) {
                enqueueSnackbar("Elemento ha sido borrado con exito", { variant: "success" })
            } else if (response?.status_code === 21) {
                enqueueSnackbar("Entrada no encontrada: No se encuentra el elemento que intenta editar.", { variant: "error" })
            }
        }
        if (typeDialog === 'clearlist') {
            const response = await ClearList(session_id, itemToDelete.list_id)
            if (response?.status_code === 12) {
                enqueueSnackbar("Todos los elementos han sido eliminados", { variant: "success" })
            } else {
                enqueueSnackbar("Algo no salió como esperábamos. Por favor, inténtalo de nuevo", { variant: "error" })
            }
        }
        if (typeDialog === 'list') {
            const response = await DeleteList(session_id, itemToDelete.list_id)
            if (response?.status_code === 13) {
                enqueueSnackbar("Elemento ha sido borrado con exito", { variant: "success" })
            } else if (response?.status_code === 21) {
                enqueueSnackbar("Entrada no encontrada: No se encuentra el elemento que intenta editar.", { variant: "error" })
            }
        }
        await RevalidateURL("lists")
        await RevalidateURL("listMovies")
        setViewDialog(false)
    }

    return (
        <>
            {viewDialog &&
                <dialog className={styles.dialog} open>
                    <section className={styles.dialog_section}>
                        <article className={styles.dialog_text}>
                            <span className={styles.dialog_p}>{itemToDelete.text[0]}</span>
                            <span className={styles.dialog_pc}>{`'${itemToDelete.name_item}'`}</span>
                            <span className={styles.dialog_p}>{itemToDelete.text[1]}</span>
                        </article>
                        <footer className={styles.dialog_footer}>
                            <Button mode="button" text="Cancelar" isSecondary icon={<CloseIcon />} onClick={() => setViewDialog(false)} />
                            <Button mode="button" text="Aceptar" icon={<CheckOnlyIcon />} onClick={HandleAcceptAction} />
                        </footer>
                    </section>
                </dialog>
            }
        </>
    )
}