import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { BookmarkIcon, ListIcon } from "../utils/svg"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {

    return (
        <section>
            <HeaderSection title="Lista de Seguimiento" icon={<BookmarkIcon />} />
        </section>
    )
}