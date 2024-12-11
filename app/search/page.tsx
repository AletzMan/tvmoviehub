
import styles from "./styles.module.scss"
import { GetSearchMulti } from "@/app/services/fetchData"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { IMultiResponse } from "@/app/interfaces/multi"
import { MultiCard } from "@/app/components/MultiCard/MultiCard"
import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { SearchIcon } from "../utils/svg"
import { NotResultsView } from "../components/NotResultsView/NotResultsView"

export default async function Page(params: { params: { lang: string }, searchParams: { page: number, query: string } }) {


    const results: IMultiResponse = await GetSearchMulti(params.searchParams)

    return (
        <section className={`${styles.section}`}>
            <HeaderSection title="Resultados para: " icon={<SearchIcon />} query={params.searchParams.query} />
            {results.results.length > 0 ?
                <div className={`${styles.people} scrollBarStyle`}>
                    {
                        results.results.map(result => (
                            <MultiCard key={result.id} result={result} />
                        ))
                    }
                </div>
                :
                <NotResultsView />
            }
            {results.results.length > 0 && <Pagination currentPage={results.page} totalPages={results.total_pages > 500 ? 500 : results.total_pages} />}
        </section>
    )
}