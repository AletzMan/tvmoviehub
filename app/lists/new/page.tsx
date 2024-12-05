import { HeaderSection } from "../../components/HeaderSection/HeaderSection"
import { ListAddIcon, ListIcon } from "../../utils/svg"
import { FormAddMovie } from "../components/FormAddMovie"
import ListMovies from "../components/ListMovies"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {

    return (
        <section >
            <HeaderSection title="Crear lista" icon={<ListAddIcon />} />
            <div className={styles.section}>
                <FormAddMovie />
            </div>
        </section>
    )
}