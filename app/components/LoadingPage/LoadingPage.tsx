import { LoadingIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"

export function LoadingPage() {

    return (
        <dialog open className={styles.dialog}>
            <div className={styles.dialog_container}>
                <LoadingIcon className={styles.dialog_icon} />
                <span className={styles.dialog_text}>CARGANDO</span>
            </div>
        </dialog>
    )
}