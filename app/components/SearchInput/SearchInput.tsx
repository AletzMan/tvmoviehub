"use client"
import { SearchIcon } from "@/app/utils/svg"
import styles from "./searchinput.module.scss"
type Props = {

}
export const SearchInput = ({ }: Props) => {
    return (
        <div className={styles.search}>
            <SearchIcon className={styles.search_icon} />
            <input className={styles.search_input} />
        </div>
    )
}