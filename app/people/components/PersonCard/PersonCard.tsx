"use client"
import { IPeople } from "@/app/interfaces/people"
import styles from "./personcard.module.scss"
import Image from "next/image"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { FemaleIcon, LoadingIcon, MaleIcon } from "@/app/utils/svg"
import Link from "next/link"
import { useState } from "react"
import { useLoadingState } from "@/app/services/store"

interface Props {
    person: IPeople
}
export const PersonCard = ({ person }: Props) => {
    const [load, setLoad] = useState(true)
    const { setLoadingState } = useLoadingState()

    const HandleLoadImage = () => {
        setLoad(false)
    }

    return (
        <Link className={styles.people} href={`/people/${person.id}`} onClick={() => setLoadingState(true)}>
            <Image className={styles.people_image} onLoad={HandleLoadImage} src={person.profile_path !== null ? BASE_URL_IMG_CUSTOM.concat(`/w342`.concat(person.profile_path)) : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"} alt={`Imagen de perfil de ${person.name}`} width={150} height={200} />
            <div className={styles.people_description}>
                <span className={styles.people_name}>{person.name}</span>
                {person.gender === 1 ?
                    <FemaleIcon className={`${styles.people_gender} ${styles.people_genderFemale}`} />
                    :
                    <MaleIcon className={`${styles.people_gender} ${styles.people_genderMale}`} />
                }
            </div>
            {load && <LoadingIcon className={styles.loading} />}
        </Link>
    )
}