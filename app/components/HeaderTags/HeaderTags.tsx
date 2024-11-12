"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { GetKeywordName } from "@/app/services/fetchData"
import { CloseIcon } from "@/app/utils/svg"

interface ITag { id: string, name: string }

interface Props {
    icon?: JSX.Element
}

export function HeaderTags({ icon }: Props) {
    const [tags, setTags] = useState<ITag[]>([])
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const paramTag = searchParams.get("with_keywords")
        if (paramTag) {
            const arrayTags = paramTag.split("|")
            const GetNameTag = async () => {
                const newTags: ITag[] = []
                for (let index = 0; index < arrayTags.length; index++) {
                    const result = await GetKeywordName(`${arrayTags[index]}`)
                    newTags.push({ id: arrayTags[index], name: result?.name || "" })
                }
                setTags(newTags)
            }
            GetNameTag()
        }
    }, [searchParams])

    const HandleDeleteTag = () => {
        const newParams = new URLSearchParams(searchParams)
        newParams.delete("with_keywords")
        router.push(`${pathname}?${newParams}`)
    }

    return (
        <>
            {searchParams.get("with_keywords") &&
                <header className={styles.header}>
                    <div className={styles.header_div}>
                        <h3 className={styles.header_title}>Etiquetas: </h3>
                        {tags?.map(tag =>
                            <button key={tag.id} className={styles.header_search} onClick={HandleDeleteTag}>
                                {tag.name}
                                <CloseIcon className={styles.header_searchClose} />
                            </button>
                        )
                        }
                    </div>
                    <span className={styles.header_icon}>
                        {icon}
                    </span>
                </header>
            }
        </>
    )
}