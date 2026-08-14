"use client"
import { IParticipationsCast } from "@/app/interfaces/credits"
import styles from "./person.module.scss"
import { useState } from "react"
import { MovieViewCard } from "./MovieViewCard"

interface Props {
    moviesCast?: IParticipationsCast[]
}

export const PersonJobs = ({ moviesCast }: Props) => {
    const [currentSection, setCurrentSection] = useState("Películas")
    const departments = moviesCast?.map(movie => {
        const uniques = new Set();
        uniques.add(movie.character)
        return uniques
    })
    console.log(departments)

    return (
        <div className={styles.jobs}>
            <header>
                {sections.map(section => (
                    <button
                        key={section}
                        onClick={() => setCurrentSection(section)}
                        className={`${currentSection === section ? styles.section_current : null}`}>
                        {section}
                    </button>
                ))

                }
            </header>
            <article className={styles.grid}>
                {moviesCast?.map(movie => (
                    <MovieViewCard movie={movie} key={movie.id} />
                ))

                }
            </article>

        </div>
    )
}

const sections = [
    "Películas",
    "Series",
    "Galería",
    "Biografía"
]