"use client"
import { IPeople } from "@/app/interfaces/people"
import styles from "./personcard.module.scss"
import Image from "next/image"
import { BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import { FemaleIcon, LoadingIcon, MaleIcon } from "@/app/utils/svg"
import Link from "next/link"
import { useState } from "react"
import { useLoadingState } from "@/app/services/store"

interface Props {
    person: IPeople
    rank?: number
    isFeatured?: boolean
}

export const PersonCard = ({ person, rank, isFeatured = false }: Props) => {
    const [load, setLoad] = useState(true)
    const { setLoadingState } = useLoadingState()

    const HandleLoadImage = () => {
        setLoad(false)
    }

    const departmentTranslations: Record<string, string> = {
        "Acting": "Actuación",
        "Directing": "Dirección",
        "Production": "Producción",
        "Writing": "Guion",
        "Editing": "Edición",
        "Camera": "Cámara",
        "Sound": "Sonido",
        "Art": "Arte",
        "Costume & Make-up": "Vestuario y Maquillaje",
        "Visual Effects": "Efectos Visuales",
        "Crew": "Equipo Técnico",
        "Lighting": "Iluminación",
        "Music": "Música"
    };

    // Función para obtenerlo traducido (con respaldo por si viene alguno nuevo)
    const translateDepartment = (dept: string) => {
        return departmentTranslations[dept] || dept;
    };

    return (
        <Link
            className={`${styles.person} ${isFeatured ? styles.person_featured : ''}`}
            href={`/people/${person.id}`}
            onClick={() => setLoadingState(true)}
        >
            {rank && <div className={`${styles.person_rank} ${isFeatured ? styles.person_rankFeatured : null}`}>
                <svg width="60"
                    height="40"
                    viewBox="95 85 62 45" >
                    <path d="m 155.69565,88.066944 -7.17837,0.0155 h -42.56949 c -5.97531,-2e-6 -10.819497,4.844179 -10.819498,10.819492 v 25.735904 l -0.01395,3.96255 c 0.359393,-1.88082 2.148328,-3.74066 4.234368,-3.96255 h 34.63716 c 8.02567,0 14.53142,-6.50626 14.53142,-14.53193 V 98.411016 c 0,-4.577005 3.2152,-8.860428 7.17837,-10.344075 z"></path>
                </svg>
                <span>#{rank}</span>
            </div>}
            <div className={styles.person_imageWrapper}>

                <Image
                    className={styles.person_image}
                    onLoad={HandleLoadImage}
                    src={person.profile_path !== null ? BASE_URL_IMG_CUSTOM.concat(`/h632`.concat(person.profile_path)) : "https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg"}
                    alt={`Imagen de perfil de ${person.name}`}
                    width={300}
                    height={450}
                />
                <div className={styles.person_overlay}></div>
                {load && <LoadingIcon className={styles.loading} />}
            </div>

            <div className={styles.person_info}>
                <div className={styles.person_details}>
                    <span className={styles.person_name} title={person.name}>{person.name}</span>
                    <span className={styles.person_department}>{translateDepartment(person.known_for_department)}</span>
                </div>
                {person.gender === 1 ?
                    <FemaleIcon className={`${styles.person_gender} ${styles.person_genderFemale}`} />
                    :
                    <MaleIcon className={`${styles.person_gender} ${styles.person_genderMale}`} />
                }
            </div>
        </Link>
    )
}