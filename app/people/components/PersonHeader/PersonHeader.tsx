"use client"
import Image from "next/image"
import styles from "./person.module.scss"
import { BASE_URL_IMG } from "@/app/utils/const"
import { IPeopleDetails } from "@/app/interfaces/people"

interface Props {
    details: IPeopleDetails;
    children: React.ReactNode; // Para pasar la sección de datos y biografía
}

export const PeopleHeader = ({ details, children }: Props) => {
    const bgUrl = BASE_URL_IMG.concat(details.profile_path || "...");

    return (
        <article className={styles.people}>
            {/* Capa de fondo difuminada con la misma foto */}
            <div
                className={styles.bgBlur}
                style={{ backgroundImage: `url(${bgUrl})` }}
            />

            {/* Tu imagen normal y corriente */}
            <Image
                className={styles.people_photo}
                src={bgUrl}
                alt={`Foto de ${details.name}`}
                width={200}
                height={300}
            />

            {children}
        </article>
    )
}