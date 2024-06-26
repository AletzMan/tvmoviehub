"use client"

import { IPeople } from "@/app/interfaces/people"
import styles from "./popularpeople.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/svg"
import Link from "next/link"

type Props = {
    people: IPeople[]
}
export const PopularPeople = ({ people }: Props) => {

    return (
        <section className={styles.section}>
            {
                people.map((person, index) => (
                    <Link key={person.id} className={styles.person} href={`/people/${person.id}`}>
                        <picture className={styles.person_picture}>
                            <Image className={styles.person_image} src={BASE_URL_IMG.concat(person.profile_path)} alt={`Foto de ${person.name}`} width={90} height={120} />
                        </picture>
                        <span className={styles.person_name}>{person.name}</span>
                        {<div className={styles.person_position}><StarIcon className={styles.person_positionIcon} /> <span className={styles.person_positionNumber}>{index + 1}</span></div>}
                    </Link>
                ))
            }
        </section>
    )
}