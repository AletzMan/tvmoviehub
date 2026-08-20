"use client"

import { Button } from "../../components/Button/Button"
import { HeaderSection } from "../../components/HeaderSection/HeaderSection"
import { AddIcon } from "../../utils/svg"
import { FormAddMovie } from "./FormAddMovie"
import styles from "./styles.module.scss"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface Props {
    searchParams: { type: string, page: string }
    children: React.ReactNode
}

export default function ListPageContent({ searchParams, children }: Props) {
    const [showModal, setShowModal] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSuccess = () => {
        setShowModal(false)
    }

    return (
        <section className={styles.section}>
            <HeaderSection title="Mis listas"  >
                <Button mode="button" text="Crear Lista" icon={<AddIcon />} onClick={() => setShowModal(true)} />
            </HeaderSection>
            {children}
            {mounted && showModal && createPortal(
                <dialog className={styles.modal} open onMouseDown={(e) => e.stopPropagation()}>
                    <div className={styles.modal_content}>
                        <FormAddMovie onSuccess={handleSuccess} onCancel={() => setShowModal(false)} />
                    </div>
                </dialog>,
                document.body
            )}
        </section>
    );
}
