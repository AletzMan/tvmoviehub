import { MainMenu } from "@/app/utils/const"
import styles from "./sidemenu.module.scss"
import Image from "next/image"
import Link from "next/link"

export const SideMenu = () => {
    return (
        <aside className={styles.aside}>
            <div className={styles.logo}>
                <Image className={styles.logo_image} src="/film_logo.png" alt="" width={40} height={40}></Image>
                <h1 className={styles.logo_text}>Film<span>Data Hub</span></h1>
            </div>
            <div className={`${styles.separator} ${styles.separator_first}`}></div>
            <nav className={styles.menu}>
                <div className={styles.menu_section}>
                    {<h2 className={styles.menu_title}>Menu</h2>}
                    {
                        MainMenu.filter((_, index) => index < 3).map(menu => (
                            <Link key={menu.id} className={`${styles.menu_item} ${menu.name}`} href={menu.link} title={`Ir a ${menu.name}`}>{menu.icon}{menu.name}</Link>
                        ))
                    }
                </div>
                <div className={styles.separator}></div>
                <div className={styles.menu_section}>
                    {<h2 className={styles.menu_title}>Usuario</h2>}
                    {
                        MainMenu.filter((_, index) => index > 2 && index < 6).map(menu => (
                            <Link key={menu.id} className={`${styles.menu_item} ${menu.name}`} href={menu.link} title={`Ir a ${menu.name}`}>{menu.icon}{menu.name}</Link>
                        ))
                    }
                </div>
                <div className={styles.separator}></div>
                <div className={styles.menu_section}>
                    {<h2 className={styles.menu_title}>General</h2>}
                    {
                        MainMenu.filter((_, index) => index >= 6).map(menu => (
                            <Link key={menu.id} className={`${styles.menu_item} ${menu.name}`} href={menu.link} title={`Ir a ${menu.name}`}>{menu.icon}{menu.name}</Link>
                        ))
                    }
                </div>
            </nav>
        </aside>
    )
}