"use client"
import styles from "./header.module.scss"
import { MainMenu } from "@/app/utils/const"
import { usePathname, useRouter } from "next/navigation"
import { SearchInput } from "../SearchInput/SearchInput"
import { ArrowDownIcon, CloseIcon, LogInIcon, LogoIcon, LogoutIcon, MenuIcon, SearchIcon } from "@/app/utils/svg"
import { SideMenu } from "../SideMenu/SideMenu"
import { MouseEvent, useEffect, useRef, useState } from "react"
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
    const router = useRouter()
    const loginWrapperRef = useRef<HTMLDivElement>(null)


    const HandleSetOpen = (type: 'menu' | 'search' | 'account') => {
        const newState: IOpen = { account: false, menu: false, search: false }
        setOpen({ ...newState, [type]: !open[type] })
    }


    const HandleSession = async () => {
        if (session.session_id) {
            localStorage.removeItem("tvmoviehub_sessionid")
            await DeleteCookie()
            HandleSetOpen("account")
            router.refresh()
        } else {
            router.push(`/login`)
        }
    }

    const HandleClickDialog = (e: MouseEvent<HTMLDialogElement>) => {
        if ((e.target as HTMLElement).tagName === "DIALOG") {
            HandleSetOpen("search")
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (loginWrapperRef.current && !loginWrapperRef.current.contains(event.target as Node)) {
                if (open.account) {
                    HandleSetOpen("account")
                }
            }
        }

        if (open.account) {
            document.addEventListener("mousedown", handleClickOutside as unknown as EventListener)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener)
        }
    }, [open.account])

    return (
        <>
            <header className={styles.header}>
                <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={3500} />
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
                            <div>MOVIE<span>DECK</span></div>
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
                        <div className={styles.login_wrapper} ref={loginWrapperRef}>
                            <button className={`${styles.login} ${open.account && styles.login_open}`} onClick={() => HandleSetOpen("account")}>
                                <span className={styles.login_user}>{`${session.session_id ? session.username : "Invitado"}`}</span>
                                <ArrowDownIcon className={styles.login_arrow} />
                            </button>
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
                        </div>
                    </div>
                </div>
                {
                    <dialog open className={`${styles.search} ${open.search && styles.search_open}`} onClick={HandleClickDialog}>
                        <SearchInput section={section} onSearch={() => HandleSetOpen("search")} />
                    </dialog>
                }
            </header>
        </>
    )
}