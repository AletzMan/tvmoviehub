import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { ListIcon } from "../utils/svg"
import ListMovies from "./components/ListMovies"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {

    return (
        <section>
            <HeaderSection title="Mis listas" icon={<ListIcon />} />
            {<ListMovies searchParams={params.searchParams} />}
        </section>
    )
}