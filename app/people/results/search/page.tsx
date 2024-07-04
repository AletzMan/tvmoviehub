
import { IPeopleResponse } from "@/app/interfaces/responses"
import styles from "../../people.module.scss"
import { GetSearchPeople } from "@/app/services/fetchData"
import { PersonCard } from "../../components/PersonCard/PersonCard"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { HeaderSection } from "@/app/components/HeaderSection/HeaderSection"
import { SearchIcon } from "@/app/utils/svg"
import { NotResultsView } from "@/app/components/NotResultsView/NotResultsView"

export default async function Page(params: { params: { lang: string }, searchParams: { page: number } }) {


    const popularPeople: IPeopleResponse = await GetSearchPeople(params.searchParams)

    return (
        <section className={`${styles.section}`}>
            <HeaderSection title="Resultados para: " icon={<SearchIcon />} />
            {popularPeople.results.length > 0 ?
                <div className={`${styles.people} scrollBarStyle`}>
                    {
                        popularPeople.results.map(person => (
                            <PersonCard key={person.id} person={person} />
                        ))
                    }
                </div>
                :
                <NotResultsView />
            }
            {popularPeople.results.length > 0 && <Pagination currentPage={popularPeople.page} totalPages={popularPeople.total_pages > 500 ? 500 : popularPeople.total_pages} />}
        </section>
    )
}