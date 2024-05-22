
import Header from "./components/Header/Header"
import { SideMenu } from "./components/Header/SideMenu/SideMenu"
import styles from "./page.module.css"

export default async function Home(params: { params: { lang: string }, searchParams: {} }) {
  return (
    <main className={styles.main}>
      <SideMenu />
      <Header />
    </main>
  )
}
