"use client"

import { IPeople } from "@/app/interfaces/people"
import styles from "./popularpeople.module.scss"
import Image from "next/image"
import { BASE_URL_IMG, URL_IMAGE_NOTPHOTO } from "@/app/utils/const"
import { StarIcon } from "@/app/utils/svg"
import Link from "next/link"
import { useLoadingState } from "@/app/services/store"

type Props = {
    people: IPeople[]
}
export const PopularPeople = ({ people }: Props) => {
    const { setLoadingState } = useLoadingState()

    return (
        <section className={styles.section}>
            {
                people.map((person, index) => (
                    <Link key={person.id} className={styles.person} href={`/people/${person.id}`} onClick={() => setLoadingState(true)}>
                        <picture className={styles.person_picture}>
                            <Image className={styles.person_image} src={person.profile_path ? BASE_URL_IMG.concat(person.profile_path || "") : URL_IMAGE_NOTPHOTO} alt={`Foto de ${person.name}`} width={90} height={120} />
                        </picture>
                        <span className={styles.person_name}>{person.name}</span>
                        {<div className={styles.person_position}><StarIcon className={styles.person_positionIcon} /> <span className={styles.person_positionNumber}>{index + 1}</span></div>}
                    </Link>
                ))
            }
        </section>
    )
}