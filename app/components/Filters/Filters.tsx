"use client"

import { Suspense, useEffect, useState } from "react"
import { ResetIcon, FiltersIcon } from "@/app/utils/svg"
import styles from "./filters.module.scss"
import { Filter } from "./components/Filter/Filter"
import { Button } from "../Button/Button"
import { FilterDate } from "./components/FilterDate/FilterDate"
import { FilterRange } from "./components/FilterRange/FilterRange"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FilterAccordion } from "./components/FilterAccordion/FilterAccordion"

interface Props {
    section: string
}

function FiltersContent({ section }: Props) {
    const [categories, setCategories] = useState(categoriesMovies)
    const [numberFilters, setNumberFilters] = useState(0)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const newCategories = section === "movies" ? categoriesMovies : categoriesSeries
        setCategories(newCategories)
        let number = 0
        for (let index = 0; index < FilterNames.length; index++) {
            const filter = searchParams.get(FilterNames[index])
            if (filter) {
                number++
            }
        }
        setNumberFilters(number)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const HandleAllResetFilter = () => {
        router.push(`${pathname}?page=1`)
        setNumberFilters(0)
    }

    return (
        <>
            {/* Botón móvil */}
            <button
                className={styles.mobileButton}
                onClick={() => setIsMobileOpen(true)}
            >
                <FiltersIcon className={styles.mobileButtonIcon} />
                <span>Filtros</span>
                {numberFilters > 0 && <span className={styles.mobileButtonBadge}>{numberFilters}</span>}
            </button>

            {/* Sidebar móvil */}
            {isMobileOpen && (
                <>
                    <div className={styles.mobileOverlay} onClick={() => setIsMobileOpen(false)} />
                    <aside className={styles.mobileSidebar}>
                        <div className={styles.mobileSidebarHeader}>
                            <h2>Filtros</h2>
                            <button
                                className={styles.mobileCloseButton}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className={styles.mobileSidebarContent}>
                            <FilterAccordion title="Géneros" defaultOpen={true}>
                                <Filter properties={categories} nameView="" nameParam="with_genres" isInline={true} />
                            </FilterAccordion>
                            {section === "movies" && (
                                <FilterAccordion title="Clasificación">
                                    <Filter properties={Certifications} nameView="" nameParam="certification" isInline={true} />
                                </FilterAccordion>
                            )}
                            {section === "movies" && (
                                <FilterAccordion title="Tipos de lanzamiento">
                                    <Filter properties={releaseTypes} nameView="" nameParam="with_release_type" isInline={true} />
                                </FilterAccordion>
                            )}
                            <FilterAccordion title="Año de lanzamiento">
                                <FilterDate nameView="" section={section} nameParam={section === "movies" ? "primary_release_date" : "first_air_date"} isInline={true} />
                            </FilterAccordion>
                            <FilterAccordion title="Valoración">
                                <FilterRange nameView="" section={section} nameParam={"vote_average"} isInline={true} />
                            </FilterAccordion>
                            <FilterAccordion title="Votos mínimos">
                                <FilterRange nameView="" section={section} nameParam={"vote_count"} min={0} max={500} step={10} singleValue={true} isInline={true} />
                            </FilterAccordion>
                        </div>
                        {numberFilters > 0 && (
                            <div className={styles.mobileSidebarFooter}>
                                <Button
                                    text={`Limpiar (${numberFilters})`}
                                    isSecondary
                                    icon={<ResetIcon />}
                                    onClick={HandleAllResetFilter}
                                    mode="button"
                                />
                            </div>
                        )}
                    </aside>
                </>
            )}

            {/* Sidebar desktop fijo */}
            <aside className={styles.desktopSidebar}>
                <FilterAccordion title="Géneros" defaultOpen={true}>
                    <Filter properties={categories} nameView="" nameParam="with_genres" isInline={true} />
                </FilterAccordion>
                {section === "movies" && (
                    <FilterAccordion title="Clasificación">
                        <Filter properties={Certifications} nameView="" nameParam="certification" isInline={true} />
                    </FilterAccordion>
                )}
                {section === "movies" && (
                    <FilterAccordion title="Tipos de lanzamiento">
                        <Filter properties={releaseTypes} nameView="" nameParam="with_release_type" isInline={true} />
                    </FilterAccordion>
                )}
                <FilterAccordion title="Año de lanzamiento">
                    <FilterDate nameView="" section={section} nameParam={section === "movies" ? "primary_release_date" : "first_air_date"} isInline={true} />
                </FilterAccordion>
                <FilterAccordion title="Valoración">
                    <FilterRange nameView="" section={section} nameParam={"vote_average"} isInline={true} />
                </FilterAccordion>
                <FilterAccordion title="Votos mínimos">
                    <FilterRange nameView="" section={section} nameParam={"vote_count"} min={0} max={500} step={10} singleValue={true} isInline={true} />
                </FilterAccordion>
                {numberFilters > 0 && (
                    <div className={styles.desktopFooter}>
                        <Button
                            text={`Limpiar (${numberFilters})`}
                            isSecondary
                            icon={<ResetIcon />}
                            onClick={HandleAllResetFilter}
                            mode="button"
                        />
                    </div>
                )}
            </aside>
        </>
    )
}

export function Filters(props: Props) {
    return (
        <Suspense fallback={null}>
            <FiltersContent {...props} />
        </Suspense>
    )
}

const FilterNames = [
    "with_genres",
    "certification",
    "with_release_type",
    "primary_release_date.gte",
    "first_air_date.gte",
    "vote_average.gte",
    "vote_count.gte"
]

const categoriesMovies = [
    { option: "Acción", value: "28" },
    { option: "Aventura", value: "12" },
    { option: "Animación", value: "16" },
    { option: "Comedia", value: "35" },
    { option: "Crimen", value: "80" },
    { option: "Documental", value: "99" },
    { option: "Drama", value: "18" },
    { option: "Familia", value: "10751" },
    { option: "Fantasía", value: "14" },
    { option: "Historia", value: "36" },
    { option: "Terror", value: "27" },
    { option: "Música", value: "10402" },
    { option: "Misterio", value: "9648" },
    { option: "Romance", value: "10749" },
    { option: "Ciencia ficción", value: "878" },
    { option: "Película de TV", value: "10770" },
    { option: "Suspenso", value: "53" },
    { option: "Bélica", value: "10752" },
    { option: "Western", value: "37" }
]

const categoriesSeries = [
    { option: "Acción & Aventura", value: "10759" },
    { option: "Animación", value: "16" },
    { option: "Comedia", value: "35" },
    { option: "Crimen", value: "80" },
    { option: "Documental", value: "99" },
    { option: "Drama", value: "18" },
    { option: "Familia", value: "10751" },
    { option: "Kids", value: "10762" },
    { option: "Misterio", value: "9648" },
    { option: "Noticias", value: "10763" },
    { option: "Reality", value: "10764" },
    { option: "Ciencia ficción", value: "10765" },
    { option: "Telenovelas", value: "10766" },
    { option: "Talk", value: "10767" },
    { option: "Bélica", value: "10768" },
    { option: "Western", value: "37" }
]

const releaseTypes = [
    { option: "Estreno(Premiere)", value: "1" },
    { option: "Estreno en cines", value: "3" },
    { option: "Lanzamiento digital", value: "4" },
    { option: "Lanzamiento físico", value: "5" },
    { option: "Lanzamiento en TV", value: "6" }
]

export const Certifications = [
    { value: "AA", option: "Menores de 7 años (AA)" },
    { value: "A", option: "Para todos los grupos de edad (A)" },
    { value: "B", option: "Adolescentes a partir de 12 años (B)" },
    { value: "B-15", option: "Mayores de 15 años (B-15)" },
    { value: "C", option: "Para mayores de 18 años. (C)" },
    { value: "D", option: "Películas para adultos (D)" }
]