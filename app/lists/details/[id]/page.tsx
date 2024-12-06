
import { GetDetailsList } from "@/app/services/fetchData"
import styles from "./styles.module.scss"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { MovieCardList } from "@/app/components/MovieCardList/MovieCardList"


export default async function Page(params: { params: { id: string }, searchParams: { page: number } }) {

    const response = await GetDetailsList(params.params.id, params.searchParams.page)

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h1 className={styles.header_title}>{response?.name}</h1>
                <p className={styles.header_description}>{response?.description}</p>
            </header>
            <div className={`${styles.section_items}`}>
                <div className={`${styles.section_media} scrollBarStyle`}>
                    {response?.items.map(item => (
                        <MovieCardList key={item.id} movie={item} list_id={response.id} />
                    ))}
                </div>
                {response && <Pagination currentPage={response?.page} totalPages={response?.total_pages} />}
            </div>
        </section>
    )
}