"use client"
import styles from "./header.module.scss"
import { MainMenu } from "@/app/utils/const"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchInput } from "../SearchInput/SearchInput"
import { ArrowDownIcon, LogInIcon, LogoIcon, LogoutIcon, MenuIcon, SearchIcon } from "@/app/utils/svg"
import { SideMenu } from "../SideMenu/SideMenu"
import { MouseEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "@/app/hooks/useSession"
import { DeleteCookie } from "@/app/utils/serveractions"
import { SnackbarProvider } from "notistack"
import { useLoadingState } from "@/app/services/store"

interface IOpen {
    menu: boolean
    search: boolean
    account: boolean
}

export default function Header() {
    const session = useSession()
    const [open, setOpen] = useState<IOpen>({ account: false, menu: false, search: false })
    const pathname = usePathname()
    const { setLoadingState } = useLoadingState()
    const section = pathname.split("/")[1]
    const searchParams = useSearchParams()
    const router = useRouter()


    const HandleSetOpen = (type: 'menu' | 'search' | 'account') => {
        const newState: IOpen = { account: false, menu: false, search: false }
        setOpen({ ...newState, [type]: !open[type] })
    }


    const HandleSession = async () => {
        if (session.session_id) {
            console.log("LOGIN")
            localStorage.removeItem("tvmoviehub_sessionid")
            await DeleteCookie()
            HandleSetOpen("account")
            router.refresh()
        } else {
            console.log("LOGOUT")
            router.push(`/login`)
        }
    }

    const HandleClickDialog = (e: MouseEvent<HTMLDialogElement>) => {
        if ((e.target as HTMLElement).tagName === "DIALOG") {
            HandleSetOpen("search")
        }
    }

    return (
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={3000}>
            <header className={styles.header}>
                <div className={styles.header_container}>
                    <div className={styles.menu}>
                        <button className={styles.menu_button} onClick={() => HandleSetOpen("menu")}>
                            <MenuIcon className={styles.menu_icon} />
                        </button>
                        {
                            <dialog open className={`${styles.menu_dialog} ${open.menu && styles.menu_dialogOpen}`} onClick={() => HandleSetOpen("menu")}>
                                <SideMenu />
                            </dialog>
                        }
                    </div>
                    <div className={styles.mobile}>
                        <Link href="/">
                            <LogoIcon className={styles.mobile_logo} />
                        </Link>
                        {/*<div className={styles.mobile_pathname}>
                            {MainMenu.find(menu => menu.link === section)?.icon}
                            {MainMenu.find(menu => menu.link === section)?.name}
                    </div>*/}
                    </div>
                    <nav className={styles.navigation}>
                        {
                            MainMenu.filter((_, index) => index < 5 && index > 0).map((menu, index) => (
                                <Link key={menu.id} className={`${styles.navigation_item} ${menu.link === section && styles.navigation_itemCurrent} ${menu.name}`} onClick={() => setLoadingState(true)} href={`/${menu.link}${index > 0 ? "?page=1" : ""}`} title={`Ir a ${menu.name}`}> {menu.name}</Link>
                            ))
                        }
                    </nav>
                    <div className={styles.section}>
                        <button className={styles.button} onClick={() => HandleSetOpen("search")}>
                            <SearchIcon className={styles.button_icon} />
                        </button>
                        <button className={`${styles.login} ${open.account && styles.login_open}`} onClick={() => HandleSetOpen("account")}>
                            <span className={styles.login_user}>{`${session.session_id ? session.username : "Invitado"}`}</span>
                            <ArrowDownIcon className={styles.login_arrow} />
                        </button>

                    </div>
                </div>
                {
                    <dialog open className={`${styles.search} ${open.search && styles.search_open}`} onClick={HandleClickDialog}>
                        <SearchInput section={section} onSearch={() => HandleSetOpen("search")} />
                    </dialog>
                }
                <dialog open className={`${styles.login_dialog} ${open.account && styles.login_dialogOpen}`} onClick={() => HandleSetOpen("account")}>
                    <nav className={`${styles.login_menu} ${open.account && styles.login_menuOpen}`}>
                        {session.session_id &&
                            MainMenu.filter((_, index) => index > 4 && index < 9).map(menu => (
                                <Link key={menu.id} className={`${styles.login_menuLink} ${menu.link.split("?")[0] === section && styles.login_menuLinkCurrent}  ${menu.name}`} onClick={() => setLoadingState(true)} href={`/${menu.link}`} title={`Ir a ${menu.name}`}>{menu.icon}{menu.name}</Link>
                            ))
                        }
                        {session.session_id && <hr className={styles.separator} />}
                        <button className={styles.login_menuLink} title="Iniciar sesión" onClick={HandleSession}>
                            {session.session_id ?
                                <LogoutIcon className={styles.login_menuIcon} />
                                :
                                <LogInIcon className={styles.login_menuIcon} />
                            }
                            {session.session_id ? "Cerrar sesión" : "Iniciar sesión"}
                        </button>
                    </nav>
                </dialog>
            </header>
        </SnackbarProvider>
    )
}