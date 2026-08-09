"use client"
import { NextPageIcon, PrevPageIcon } from "@/app/utils/svg"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useMemo } from "react"
import styles from "./pagination.module.scss"

interface Props {
    totalPages: number
    currentPage: number
    pathname?: string
    onClickPagination?: (page: number) => void
}

function PaginationContent({ currentPage, totalPages, onClickPagination }: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Generación dinámica y limpia de las páginas a mostrar sin useEffect
    const pages = useMemo(() => {
        const actualTotalPages = totalPages > 500 ? 500 : totalPages;
        if (actualTotalPages <= 7) {
            return Array.from({ length: actualTotalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', actualTotalPages];
        }

        if (currentPage >= actualTotalPages - 3) {
            return [1, '...', actualTotalPages - 4, actualTotalPages - 3, actualTotalPages - 2, actualTotalPages - 1, actualTotalPages];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', actualTotalPages];
    }, [currentPage, totalPages]);

    // Construcción de la URL manteniendo los searchParams actuales
    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const actualTotalPages = totalPages > 500 ? 500 : totalPages;

    return (
        <nav className={styles.pagination} aria-label="Paginación">
            {/* Botón Anterior */}
            {onClickPagination ? (
                <button
                    className={`${styles.pagination_button} ${currentPage === 1 ? styles.pagination_buttonInactive : ''}`}
                    onClick={() => onClickPagination(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <PrevPageIcon />
                </button>
            ) : (
                <Link
                    className={`${styles.pagination_button} ${currentPage === 1 ? styles.pagination_buttonInactive : ''}`}
                    href={createPageUrl(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                >
                    <PrevPageIcon />
                </Link>
            )}

            {/* Números de página */}
            {pages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className={styles.pagination_ellipsis}>
                            ...
                        </span>
                    )
                }

                const pageNum = Number(page);
                const isCurrent = currentPage === pageNum;

                if (onClickPagination) {
                    return (
                        <button
                            key={page}
                            className={`${styles.pagination_button} ${isCurrent ? styles.pagination_buttonCurrent : ''}`}
                            onClick={() => onClickPagination(pageNum)}
                        >
                            {page}
                        </button>
                    )
                }

                return (
                    <Link
                        key={page}
                        className={`${styles.pagination_button} ${isCurrent ? styles.pagination_buttonCurrent : ''}`}
                        href={createPageUrl(pageNum)}
                    >
                        {page}
                    </Link>
                )
            })}

            {/* Botón Siguiente */}
            {onClickPagination ? (
                <button
                    className={`${styles.pagination_button} ${currentPage === actualTotalPages ? styles.pagination_buttonInactive : ''}`}
                    onClick={() => onClickPagination(currentPage + 1)}
                    disabled={currentPage === actualTotalPages}
                >
                    <NextPageIcon />
                </button>
            ) : (
                <Link
                    className={`${styles.pagination_button} ${currentPage === actualTotalPages ? styles.pagination_buttonInactive : ''}`}
                    href={createPageUrl(currentPage + 1)}
                    aria-disabled={currentPage === actualTotalPages}
                >
                    <NextPageIcon />
                </Link>
            )}
        </nav>
    )
}

export function Pagination(props: Props) {
    return (
        <Suspense fallback={null}>
            <PaginationContent {...props} />
        </Suspense>
    )
}