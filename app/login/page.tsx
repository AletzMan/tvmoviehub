import { FormLogin } from "./components/FormLogin/FormLogin"
import styles from "./styles.module.scss"

export default async function Page() {



    return (
        <section className={styles.section}>
            <FormLogin />
        </section>
    )
}