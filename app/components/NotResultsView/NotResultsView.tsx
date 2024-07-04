import { NotFoundIcon } from "@/app/utils/svg"
import styles from "./styles.module.scss"

export function NotResultsView() {

    return (
        <article className={styles.view}>
            <NotFoundIcon className={styles.view_icon} />
            <p className={styles.view_message}>No se encontraron resultados para su búsqueda.</p>
            <p className={styles.view_messageTwo}>Intente con diferentes palabras clave o ajuste los filtros para obtener mejores resultados.</p>
        </article>
    )
}