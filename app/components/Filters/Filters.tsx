"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import { ResetIcon, FiltersIcon, SuccessIcon } from "@/app/utils/svg"
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
    const [hasPendingChanges, setHasPendingChanges] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [genresCount, setGenresCount] = useState(0)
    const [certCount, setCertCount] = useState(0)
    const [releaseTypeCount, setReleaseTypeCount] = useState(0)
    const [isDateActive, setIsDateActive] = useState(false)
    const [isVoteAvgActive, setIsVoteAvgActive] = useState(false)
    const [isVoteCountActive, setIsVoteCountActive] = useState(false)

    // Store current values from child components
    const filterValues = useRef<Map<string, any>>(new Map())
    const pendingFilters = useRef<Set<string>>(new Set())

    const handleRegisterValue = (value: any, key: string) => {
        filterValues.current.set(key, value)
    }

    const handlePendingChange = (pending: boolean, key: string) => {
        if (pending) {
            pendingFilters.current.add(key)
        } else {
            pendingFilters.current.delete(key)
        }
        setHasPendingChanges(pendingFilters.current.size > 0)
    }

    const handleApplyAll = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        
        // Apply all filter values
        filterValues.current.forEach((value, key) => {
            if (key === "genres") {
                if (value) {
                    newSearchParams.set("with_genres", value)
                } else {
                    newSearchParams.delete("with_genres")
                }
            } else if (key === "certification") {
                if (value) {
                    newSearchParams.set("certification", value)
                } else {
                    newSearchParams.delete("certification")
                }
            } else if (key === "release_type") {
                if (value) {
                    newSearchParams.set("with_release_type", value)
                } else {
                    newSearchParams.delete("with_release_type")
                }
            } else if (key === "date") {
                if (value.gte && value.lte) {
                    const startDate = `${value.lte}-01-01`
                    const endDate = `${value.gte}-12-31`
                    const paramName = section === "movies" ? "primary_release_date" : "first_air_date"
                    newSearchParams.set(`${paramName}.gte`, startDate)
                    newSearchParams.set(`${paramName}.lte`, endDate)
                    const filterYear = section === "movies" ? "primary_release_year" : "first_air_date_year"
                    newSearchParams.set("sort_by", "primary_release_date.asc")
                    newSearchParams.delete(filterYear)
                } else {
                    const paramName = section === "movies" ? "primary_release_date" : "first_air_date"
                    newSearchParams.delete(`${paramName}.gte`)
                    newSearchParams.delete(`${paramName}.lte`)
                }
            } else if (key === "vote_average") {
                const paramName = "vote_average"
                if (value.gte !== 0 || value.lte !== 10) {
                    if (value.gte !== 0) {
                        newSearchParams.set(`${paramName}.gte`, value.gte.toString())
                    } else {
                        newSearchParams.delete(`${paramName}.gte`)
                    }
                    if (value.lte !== 10) {
                        newSearchParams.set(`${paramName}.lte`, value.lte.toString())
                    } else {
                        newSearchParams.delete(`${paramName}.lte`)
                    }
                } else {
                    newSearchParams.delete(`${paramName}.gte`)
                    newSearchParams.delete(`${paramName}.lte`)
                }
            } else if (key === "vote_count") {
                if (value.gte !== 0) {
                    newSearchParams.set("vote_count.gte", value.gte.toString())
                } else {
                    newSearchParams.delete("vote_count.gte")
                }
            }
        })
        
        router.push(`${pathname}?${newSearchParams.toString()}`)
        pendingFilters.current.clear()
        setHasPendingChanges(false)
    }

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

        const genres = searchParams.get("with_genres")
        setGenresCount(genres ? genres.split(",").filter(Boolean).length : 0)

        const certs = searchParams.get("certification")
        setCertCount(certs ? certs.split(",").filter(Boolean).length : 0)

        const relTypes = searchParams.get("with_release_type")
        setReleaseTypeCount(relTypes ? relTypes.split(",").filter(Boolean).length : 0)

        const dateGte = searchParams.get(section === "movies" ? "primary_release_date.gte" : "first_air_date.gte")
        const dateLte = searchParams.get(section === "movies" ? "primary_release_date.lte" : "first_air_date.lte")
        setIsDateActive(Boolean(dateGte || dateLte))

        const voteAvgGte = searchParams.get("vote_average.gte")
        const voteAvgLte = searchParams.get("vote_average.lte")
        setIsVoteAvgActive(Boolean(voteAvgGte || voteAvgLte))

        const voteCountGte = searchParams.get("vote_count.gte")
        setIsVoteCountActive(Boolean(voteCountGte))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, section])

    const HandleAllResetFilter = () => {
        router.push(`${pathname}?page=1`)
        setNumberFilters(0)
    }

    const renderAccordionList = () => (
        <>
            <FilterAccordion title="Géneros" defaultOpen={true} badgeCount={genresCount}>
                <Filter
                    properties={categories}
                    nameView=""
                    nameParam="with_genres"
                    isInline={true}
                    onCountChange={setGenresCount}
                    onRegisterValue={handleRegisterValue}
                    onPendingChange={handlePendingChange}
                    filterKey="genres"
                />
            </FilterAccordion>
            {section === "movies" && (
                <FilterAccordion title="Clasificación" badgeCount={certCount}>
                    <Filter
                        properties={Certifications}
                        nameView=""
                        nameParam="certification"
                        isInline={true}
                        onCountChange={setCertCount}
                        onRegisterValue={handleRegisterValue}
                        onPendingChange={handlePendingChange}
                        filterKey="certification"
                    />
                </FilterAccordion>
            )}
            {section === "movies" && (
                <FilterAccordion title="Tipos de lanzamiento" badgeCount={releaseTypeCount}>
                    <Filter
                        properties={releaseTypes}
                        nameView=""
                        nameParam="with_release_type"
                        isInline={true}
                        onCountChange={setReleaseTypeCount}
                        onRegisterValue={handleRegisterValue}
                        onPendingChange={handlePendingChange}
                        filterKey="release_type"
                    />
                </FilterAccordion>
            )}
            <FilterAccordion title="Año de lanzamiento" isActive={isDateActive}>
                <FilterDate
                    nameView=""
                    section={section}
                    nameParam={section === "movies" ? "primary_release_date" : "first_air_date"}
                    isInline={true}
                    onActiveChange={setIsDateActive}
                    onRegisterValue={handleRegisterValue}
                    onPendingChange={handlePendingChange}
                    filterKey="date"
                />
            </FilterAccordion>
            <FilterAccordion title="Valoración" isActive={isVoteAvgActive}>
                <FilterRange
                    nameView=""
                    section={section}
                    nameParam={"vote_average"}
                    isInline={true}
                    onActiveChange={setIsVoteAvgActive}
                    onRegisterValue={handleRegisterValue}
                    onPendingChange={handlePendingChange}
                    filterKey="vote_average"
                />
            </FilterAccordion>
            <FilterAccordion title="Votos mínimos" isActive={isVoteCountActive}>
                <FilterRange
                    nameView=""
                    section={section}
                    nameParam={"vote_count"}
                    min={0}
                    max={500}
                    step={10}
                    singleValue={true}
                    isInline={true}
                    onActiveChange={setIsVoteCountActive}
                    onRegisterValue={handleRegisterValue}
                    onPendingChange={handlePendingChange}
                    filterKey="vote_count"
                />
            </FilterAccordion>
        </>
    )

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
                            {renderAccordionList()}
                        </div>
                        <div className={styles.mobileSidebarFooter}>
                            {numberFilters > 0 && (
                                <Button
                                    text={`Limpiar (${numberFilters})`}
                                    isSecondary
                                    icon={<ResetIcon />}
                                    onClick={HandleAllResetFilter}
                                    mode="button"
                                />
                            )}
                            {hasPendingChanges && (
                                <Button
                                    text="Aplicar filtros"
                                    icon={<SuccessIcon />}
                                    onClick={handleApplyAll}
                                    mode="button"
                                />
                            )}
                        </div>
                    </aside>
                </>
            )}

            {/* Sidebar desktop fijo */}
            <aside className={styles.desktopSidebar}>
                {numberFilters > 0 && (
                    <div className={styles.desktopFooter}>
                        <h2>
                            <FiltersIcon />
                            Filtros
                        </h2>
                        <Button
                            text={`Limpiar (${numberFilters})`}
                            isSecondary
                            icon={<ResetIcon />}
                            onClick={HandleAllResetFilter}
                            mode="button"
                        />
                    </div>
                )}
                {renderAccordionList()}
                {hasPendingChanges && (
                    <div className={styles.desktopFooter}>
                        <Button
                            text="Aplicar filtros"
                            icon={<SuccessIcon />}
                            onClick={handleApplyAll}
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