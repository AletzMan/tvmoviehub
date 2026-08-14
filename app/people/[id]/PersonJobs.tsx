"use client"

import { useMemo, useState } from "react"

import { IMovieCredits, ISerieCredits } from "@/app/interfaces/credits"
import styles from "./person.module.scss"

import { MovieViewCard } from "./MovieViewCard"
import { RadioButtonGroup } from "@/app/components/RadioButton/RadioButtonGroup"
import { Button } from "@/app/components/Button/Button"
import { ComboBox, IPropertiesCombobox } from "@/app/components/ComboBox/ComboBox"
import { IProfile } from "@/app/interfaces/people"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import Link from "next/link"

interface Props {
    moviesCredits?: IMovieCredits
    seriesCredits?: ISerieCredits
    galery?: IProfile[]
    biography?: string
}

type Section = "Películas" | "Series" | "Galería" | "Biografía"
type View = "Reparto" | "Equipo técnico"
type SortOption = "default" | "year-desc" | "year-asc" | "title-asc" | "title-desc" | "rating-desc" | "rating-asc"

const ITEMS_PER_LOAD = 10
const GALLERY_ITEMS_PER_LOAD = 12

const viewOptions = [
    { id: "Reparto", label: "Reparto" },
    { id: "Equipo técnico", label: "Equipo técnico" }
]

const sortOptions: IPropertiesCombobox[] = [
    { option: "Año (reciente)", value: "year-desc" },
    { option: "Año (antiguo)", value: "year-asc" },
    { option: "Título (A-Z)", value: "title-asc" },
    { option: "Título (Z-A)", value: "title-desc" },
    { option: "Puntuación (alta)", value: "rating-desc" },
    { option: "Puntuación (baja)", value: "rating-asc" }
]

export const PersonJobs = ({ moviesCredits, seriesCredits, galery, biography }: Props) => {
    const [currentSection, setCurrentSection] = useState<Section>("Películas")
    const [currentView, setCurrentView] = useState<View>("Reparto")
    const [currentSort, setCurrentSort] = useState<SortOption>("year-desc")
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD)
    const [visibleGalleryItems, setVisibleGalleryItems] = useState(GALLERY_ITEMS_PER_LOAD)

    const credits = useMemo(() => {
        let rawCredits: any[] = []

        if (currentSection === "Películas") {
            rawCredits = currentView === "Reparto"
                ? moviesCredits?.cast ?? []
                : moviesCredits?.crew ?? []
        }

        if (currentSection === "Series") {
            rawCredits = currentView === "Reparto"
                ? seriesCredits?.cast ?? []
                : seriesCredits?.crew ?? []
        }

        // Aplicar ordenamiento
        const sortedCredits = [...rawCredits].sort((a, b) => {
            switch (currentSort) {
                case "year-desc":
                    const dateA = a.release_date || a.first_air_date || ""
                    const dateB = b.release_date || b.first_air_date || ""
                    return dateB.localeCompare(dateA)
                case "year-asc":
                    const dateAAsc = a.release_date || a.first_air_date || ""
                    const dateBAsc = b.release_date || b.first_air_date || ""
                    return dateAAsc.localeCompare(dateBAsc)
                case "title-asc":
                    const titleA = a.title || a.name || ""
                    const titleB = b.title || b.name || ""
                    return titleA.localeCompare(titleB)
                case "title-desc":
                    const titleADesc = a.title || a.name || ""
                    const titleBDesc = b.title || b.name || ""
                    return titleBDesc.localeCompare(titleADesc)
                case "rating-desc":
                    return (b.vote_average || 0) - (a.vote_average || 0)
                case "rating-asc":
                    return (a.vote_average || 0) - (b.vote_average || 0)
                default:
                    return 0
            }
        })

        return sortedCredits
    }, [
        currentSection,
        currentView,
        currentSort,
        moviesCredits,
        seriesCredits
    ])

    const biographySplit: string[] = biography?.split(".") || [""]
    console.log(biography, biographySplit)


    const visibleCredits = credits.slice(0, visibleItems)

    const hasMore = visibleItems < credits.length

    const handleSectionChange = (section: Section) => {
        setCurrentSection(section)
        setCurrentSort("year-desc")
        setVisibleItems(ITEMS_PER_LOAD)
        setVisibleGalleryItems(GALLERY_ITEMS_PER_LOAD)
    }

    const handleViewChange = (view: string) => {
        setCurrentView(view as View)
        setVisibleItems(ITEMS_PER_LOAD)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSort(e.target.value as SortOption)
        setVisibleItems(ITEMS_PER_LOAD)
    }

    const handleLoadMore = () => {
        setVisibleItems(prev =>
            Math.min(prev + ITEMS_PER_LOAD, credits.length)
        )
    }

    const handleLoadMoreGallery = () => {
        setVisibleGalleryItems(prev =>
            Math.min(prev + GALLERY_ITEMS_PER_LOAD, galery?.length || 0)
        )
    }

    return (
        <section className={styles.jobs}>
            <header className={styles.jobs_tabs}>
                {sections.map(section => (
                    <button
                        key={section}
                        type="button"
                        onClick={() => handleSectionChange(section)}
                        className={
                            currentSection === section
                                ? styles.section_current
                                : ""
                        }
                    >
                        {section}
                    </button>
                ))}
            </header>

            {(currentSection === "Películas" ||
                currentSection === "Series") && (
                    <>
                        <div className={styles.jobs_toolbar}>
                            <RadioButtonGroup
                                options={viewOptions}
                                name="view"
                                selectedValue={currentView}
                                onChange={handleViewChange}
                            />

                            <ComboBox
                                properties={sortOptions}
                                onChange={handleSortChange}
                                defaultValue="year-desc"
                                name="sort"
                            />

                            <span className={styles.jobs_count}>
                                {credits.length} participaciones
                            </span>
                        </div>

                        <article className={styles.grid}>
                            {visibleCredits.map((credit, index) => (
                                <MovieViewCard
                                    key={`${credit.id}-${index}`}
                                    cast={
                                        currentView === "Reparto"
                                            ? credit
                                            : undefined
                                    }
                                    crew={
                                        currentView === "Equipo técnico"
                                            ? credit
                                            : undefined
                                    }
                                />
                            ))}
                        </article>

                        {hasMore && (
                            <div className={styles.loadMore}>
                                <div className={styles.loadMore_progress}>
                                    <div
                                        style={{
                                            width: `${(visibleCredits.length /
                                                credits.length) *
                                                100
                                                }%`
                                        }}
                                    />
                                </div>

                                <span className={styles.loadMore_count}>
                                    {visibleCredits.length} de {credits.length}
                                </span>

                                <Button
                                    text="Mostrar más"
                                    mode="button"
                                    variant="surface"
                                    onClick={handleLoadMore}
                                />

                            </div>
                        )}
                    </>
                )}

            {currentSection === "Galería" && (
                <>
                    <article className={styles.galery}>
                        {galery?.slice(0, visibleGalleryItems).map(photo => (
                            <Link className={styles.galery_link} key={photo.file_path} href={`${BASE_URL_IMG}/${photo.file_path}`} target="_blank">
                                <img className={styles.galery_photo} src={photo.file_path
                                    ? `${BASE_URL_IMG_CUSTOM}/w200${photo.file_path}`
                                    : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"} />
                            </Link>
                        ))
                        }
                    </article>

                    {visibleGalleryItems < (galery?.length || 0) && (
                        <div className={styles.loadMore}>
                            <div className={styles.loadMore_progress}>
                                <div
                                    style={{
                                        width: `${(visibleGalleryItems /
                                            (galery?.length || 1)) *
                                            100
                                            }%`
                                    }}
                                />
                            </div>

                            <span className={styles.loadMore_count}>
                                {visibleGalleryItems} de {galery?.length || 0}
                            </span>

                            <Button
                                text="Mostrar más"
                                mode="button"
                                variant="surface"
                                onClick={handleLoadMoreGallery}
                            />

                        </div>
                    )}
                </>
            )
            }

            {currentSection === "Biografía" && (
                <>
                    <article className={styles.biography}>
                        {biographySplit.map(paragraph => (
                            <p key={paragraph}>{paragraph}{paragraph && "."}</p>
                        ))
                        }
                    </article>

                </>
            )}

        </section>
    )
}

const sections: Section[] = [
    "Películas",
    "Series",
    "Galería",
    "Biografía"
]