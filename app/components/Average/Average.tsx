import { StarIcon } from "@/app/utils/svg"
import styles from "./average.module.scss"

interface Props {
    average: number
}
export const Average = ({ average }: Props) => {
    return (
        <span className={styles.average}><StarIcon className={styles.iconDate} />{average.toFixed(1)}</span>
    )
}