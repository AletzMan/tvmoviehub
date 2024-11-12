"use client"
import { MainMenu } from "@/app/utils/const"
import styles from "./sidemenu.module.scss"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "@/app/hooks/useSession"

export const SideMenu = () => {
    const session = useSession()
    const pathname = usePathname()
    const section = pathname.split("/")[1]
    const router = useRouter()

    const HandleSession = () => {
        if (session.session_id) {
            localStorage.removeItem("tvmoviehub_sessionid")
            router.refresh()
        } else {
            router.push(`/login`)
        }
    }

    return (
        <aside className={`${styles.aside} scrollBarStyle`}>
            <nav className={styles.menu}>
                <div className={styles.menu_section}>
                    {<h2 className={styles.menu_title}>Menu</h2>}
                    {
                        MainMenu.filter((_, index) => index < 5 && index > 0).map((menu, index) => (
                            <Link key={menu.id} className={`${styles.menu_item} ${menu.link === section && styles.menu_itemCurrent} ${menu.name}`} href={`/${menu.link}${index > 0 ? "?page=1" : ""}`} title={`Ir a ${menu.name}`}>{menu.icon}{menu.name}</Link>
                        ))
                    }
                </div>
                {session.session_id &&
                    <>
                        <div className={styles.separator}></div>
                        <div className={styles.menu_section}>
                            {<h2 className={styles.menu_title}>Usuario</h2>}
                            {
                                MainMenu.filter((_, index) => index > 4 && index < 8).map(menu => (
                                    <Link key={menu.id} className={`${styles.menu_item} ${menu.link === section && styles.menu_itemCurrent}  ${menu.name}`} href={`/${menu.link}`} title={`Ir a ${menu.name}`}>{menu.icon}{menu.name}</Link>
                                ))
                            }
                        </div>
                    </>
                }
                {<div className={`${styles.separator} ${styles.separator_general}`}></div>}
                {<div className={`${styles.menu_section} ${styles.menu_sectionGeneral}`}>
                    {<h2 className={styles.menu_title}>General</h2>}
                    {session.session_id ?
                        <button className={`${styles.menu_item} ${MainMenu[9].link === section && styles.menu_itemCurrent}  ${MainMenu[9].name}`} title={`Ir a ${MainMenu[9].name}`} onClick={HandleSession}>{MainMenu[9].icon}{MainMenu[9].name}</button>
                        :
                        <Link className={`${styles.menu_item} ${MainMenu[10].link === section && styles.menu_itemCurrent}  ${MainMenu[10].name}`} href={`/${MainMenu[10].link}`} title={`Ir a ${MainMenu[10].name}`}>{MainMenu[10].icon}{MainMenu[10].name}</Link>
                    }
                </div>}
            </nav>
        </aside>
    )
}