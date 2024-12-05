/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { CheckOnlyIcon, CloseIcon } from "@/app/utils/svg"
import { Button } from "../Button/Button"
import styles from "./styles.module.scss"
import { useDialogAlert } from "@/app/services/store"
import { RemoveItemFromList } from "@/app/services/fetchData"
import { useSession } from "@/app/hooks/useSession"
import { enqueueSnackbar } from "notistack"
import { RevalidateURL } from "@/app/utils/serveractions"


export function DialogAlert() {
    const { viewDialog, setViewDialog, itemToDelete, typeDialog } = useDialogAlert()
    const { session_id } = useSession()

    const HandleDeleteElement = async () => {
        const response = await RemoveItemFromList(session_id, itemToDelete.list_id, itemToDelete.id)
        console.log(response)
        if (response?.status_code === 13) {
            enqueueSnackbar("Elemento ha sido borrado con exito", { variant: "success" })
            await RevalidateURL("lists")
            await RevalidateURL("listMovies")
        } else if (response?.status_code === 21) {
            enqueueSnackbar("Entrada no encontrada: No se encuentra el elemento que intenta editar.", { variant: "error" })
        }
        setViewDialog(false)
    }

    const HandleDeleteList = async () => {

    }

    return (
        <>
            {viewDialog &&
                <dialog className={styles.dialog} open>
                    <section className={styles.dialog_section}>
                        <article className={styles.dialog_text}>
                            <span className={styles.dialog_p}>¿Desea eliminar el elemento</span>
                            <span className={styles.dialog_pc}>{`'${itemToDelete.name_item}'`}</span>
                            <span className={styles.dialog_p}> de la lista?</span>
                        </article>
                        <footer className={styles.dialog_footer}>
                            <Button mode="button" text="Cancelar" isSecondary icon={<CloseIcon />} onClick={() => setViewDialog(false)} />
                            <Button mode="button" text="Aceptar" icon={<CheckOnlyIcon />} onClick={typeDialog === "item" ? HandleDeleteElement : HandleDeleteList} />
                        </footer>
                    </section>
                </dialog>
            }
        </>
    )
}