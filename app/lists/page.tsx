import { Button } from "../components/Button/Button"
import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { AddIcon, ListIcon } from "../utils/svg"
import ListMovies from "./components/ListMovies"
import styles from "./styles.module.scss"

export default async function Page(params: { searchParams: { type: string, page: string } }) {

    return (
        <section>
            <HeaderSection title="Mis listas"  >
                <Button mode="link" text="Crear Lista" icon={<AddIcon />} href="/lists/new" />
            </HeaderSection>
            {<ListMovies searchParams={params.searchParams} />}
        </section>
    )
}