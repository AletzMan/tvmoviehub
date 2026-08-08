import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { Pagination } from "../components/Pagination/Pagination"
import { IPeopleResponse } from "../interfaces/responses"
import { GetPeoplePopular } from "../services/fetchData"
import { PopularIcon } from "../utils/svg"
import { PersonCard } from "./components/PersonCard/PersonCard"
import styles from "./people.module.scss"

export default async function Page({ searchParams }: { searchParams: Promise<{ page: number }> }) {
    const params = await searchParams
    const page = params.page || 1
    const popularPeople: IPeopleResponse = await GetPeoplePopular(page)

    return (
        <section className={`${styles.section} `}>
            <HeaderSection title="Top personas (Popularidad)" icon={<PopularIcon />} />
            <div className={`${styles.people} scrollBarStyle`}>
                {
                    popularPeople.results.map(person => (
                        <PersonCard key={person.id} person={person} />
                    ))
                }
            </div>
            <Pagination currentPage={popularPeople.page} totalPages={popularPeople.total_pages > 500 ? 500 : popularPeople.total_pages} />
        </section>
    )
}