import { Pagination } from "../components/Pagination/Pagination"
import { IPeopleResponse } from "../interfaces/responses"
import { GetPeoplePopular } from "../services/fetchData"
import { PersonCard } from "./components/PersonCard/PersonCard"
import styles from "./people.module.scss"

export default async function Page(params: { params: { lang: string }, searchParams: { page: number } }) {
    console.log(params.searchParams.page)

    const popularPeople: IPeopleResponse = await GetPeoplePopular(params.searchParams.page)

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <div className={styles.people}>
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