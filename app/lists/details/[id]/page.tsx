import { GetDetailsList } from "@/app/services/fetchData"
import styles from "./styles.module.scss"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { MovieCardList } from "@/app/components/MovieCardList/MovieCardList"
import { ButtonsList } from "./components/ButtonsList/ButtonsList"

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ page: number }>
}) {
    const resolvedParams = await params
    const resolvedSearchParams = await searchParams

    const response = await GetDetailsList(
        resolvedParams.id,
        resolvedSearchParams.page
    )

    return (
        <section className={styles.section}>
            {response && (
                <header className={styles.header}>
                    <div className={styles.header_names}>
                        <span className={styles.header_eyebrow}>
                            Mi lista
                        </span>
                        <h1 className={styles.header_title}>
                            {response.name}
                        </h1>
                        {response.description && (
                            <p className={styles.header_description}>
                                {response.description}
                            </p>
                        )}
                        <div className={styles.header_meta}>
                            <span>
                                <strong>{response.total_results}</strong>
                                {response.total_results === 1
                                    ? " título"
                                    : " títulos"}
                            </span>
                        </div>
                    </div>
                    <div className={styles.header_actions}>
                        <ButtonsList details_list={response} />
                    </div>
                </header>
            )}

            <div className={styles.section_items}>
                <div className={`${styles.section_media} scrollBarStyle`}>
                    {response?.items.map(item => (
                        <MovieCardList
                            key={item.id}
                            movie={item}
                            list_id={response.id} aspectRatio="7/9"
                        />
                    ))}
                </div>
                {response && response.total_pages > 1 && (
                    <Pagination
                        currentPage={response.page}
                        totalPages={response.total_pages}
                    />
                )}
            </div>
        </section>
    )
}