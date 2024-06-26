"use client"
import { ICredits, ICrew } from "@/app/interfaces/credits"
import styles from "./crew.module.scss"
import { IPeople } from "@/app/interfaces/people"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Props {
    credits: ICredits
}

interface Crew {
    director: ICrew[]
    producer: ICrew[]
    executive_producer: ICrew[]
    writer: ICrew[]
}

export const Crew = ({ credits }: Props) => {
    const [crew, setCrew] = useState<Crew>()

    useEffect(() => {
        let director: ICrew[] = []
        let producer: ICrew[] = []
        let executive_producer: ICrew[] = []
        let writer: ICrew[] = []
        credits.crew.map(people => {
            if (people.job === "Director") {
                director.push(people)
            } else if (people.job === "Producer") {
                producer.push(people)
            } else if (people.job === "Executive Producer") {
                executive_producer.push(people)
            } else if (people.job === "Writer") {
                writer.push(people)
            }
            setCrew({ director, producer, executive_producer, writer })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.crew}>
            {crew && crew?.director?.length > 0 &&
                <>
                    <h4 className={styles.crew_title}>Dirección</h4>
                    <div className={styles.crew_peoples}>
                        {crew?.director.map(director => (
                            <Link key={director.id} className={styles.crew_people} href={`/people/${director.id}`}>{director.name}</Link>
                        ))
                        }
                    </div>
                </>
            }
            {crew && crew?.producer?.length > 0 &&
                <>

                    <h4 className={styles.crew_title}>Producción</h4>
                    <div className={styles.crew_peoples}>
                        {crew?.producer.map(producer => (
                            <Link key={producer.id} className={styles.crew_people} href={`/people/${producer.id}`}>{producer.name}</Link>
                        ))
                        }
                    </div>
                </>
            }
            {crew && crew?.executive_producer?.length > 0 &&
                <>
                    <h4 className={styles.crew_title}>Productores Ejecutivos</h4>
                    <div className={styles.crew_peoples}>
                        {crew?.executive_producer.map(executive_producer => (
                            <Link key={executive_producer.id} className={styles.crew_people} href={`/people/${executive_producer.id}`}>{executive_producer.name}</Link>
                        ))
                        }
                    </div>
                </>
            }
            {crew && crew?.writer?.length > 0 &&
                <>
                    <h4 className={styles.crew_title}>Escritores</h4>
                    <div className={styles.crew_peoples}>
                        {crew?.writer.map(writer => (
                            <Link key={writer.id} className={styles.crew_people} href={`/people/${writer.id}`}>{writer.name}</Link>
                        ))
                        }
                    </div>
                </>
            }
        </div>
    )
}