"use client"

import styles from "./styles.module.scss"
import { Pagination } from "@/app/components/Pagination/Pagination"
import { IResponseListMovie } from "@/app/interfaces/list"
import { ListCard } from "./ListCard"


const cardColors = [
    'var(--primary-500)',
    'var(--info)',
    'var(--danger)',
    'var(--warning)',
    'var(--success)'
]

interface Props {
    lists: IResponseListMovie | null
    searchParams: { type: string, page: string }
}

export default function ListMovies({ lists, searchParams }: Props) {
    return (
        <div className={styles.lists}>
            {lists && lists.results.length > 0 &&
                <section className={`${styles.lists_section}  `}>
                    {lists?.results.map((list, index) => (
                        <ListCard key={list.id} list={list} color={cardColors[index % cardColors.length]} />
                    ))
                    }
                </section>
            }
            {lists && lists.results.length > 0 && <Pagination currentPage={lists?.page || 1} totalPages={lists?.total_pages || 0} />}
            {lists && lists?.results?.length === 0 &&
                <div className={styles.message}>
                    <p className={styles.message_title}>Aún no has creado ninguna lista</p>
                    <p className={styles.message_text}>Empieza a organizar tus películas creando una lista ahora!</p>
                </div>
            }

        </div>
    )
}