import styles from "./styles.module.scss"
import { GetListMovies } from "@/app/services/fetchData"
import { cookies } from "next/headers"
import { ToastProvider } from "@/app/components/ToastProvider/ToastProvider"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { IResponseListMovie } from "@/app/interfaces/list"
import { ListCard } from "./ListCard"
import { AddMovie } from "./AddMovie"


export default async function ListMovies(params: { searchParams: { type: string, page: string } }) {
    const cookie = cookies().get("session_tvmoviehub")?.value

    const lists: IResponseListMovie | null = await GetListMovies(cookie as string, params.searchParams)

    return (
        <div className={styles.lists}>
            {lists!.results.length > 0 &&
                <ToastProvider>
                    <section className={`${styles.lists_section} scrollBarStyle`}>
                        {lists?.results.map(list => (
                            <ListCard key={list.id} list={list} />
                        ))
                        }
                    </section>
                </ToastProvider>
            }
            {lists!.results.length > 0 && <Pagination currentPage={lists?.page || 1} totalPages={lists?.total_pages || 0} />}
            {lists && lists?.results?.length === 0 &&
                <div className={styles.message}>
                    <p className={styles.message_title}>Aún no has creado ninguna lista</p>
                    <p className={styles.message_text}>Empieza a organizar tus películas creando una lista ahora!</p>
                    <AddMovie />
                </div>
            }
        </div>
    )
}