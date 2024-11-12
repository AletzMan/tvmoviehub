"use client"
import { LogInIcon } from "@/app/utils/svg"
import styles from "../../styles.module.scss"
import { TextBox } from "@/app/components/TextBox/TextBox"
import { Button } from "@/app/components/Button/Button"
import { useState, MouseEvent, ChangeEvent } from "react"
import Link from "next/link"
import { ValidateLogin } from "@/app/utils/helpers"
import { GetDetailsAccount } from "@/app/services/fetchData"
import { IUserSession } from "@/app/interfaces/authentication"
import { useRouter } from "next/navigation"
import { CreateCookie } from "@/app/utils/serveractions"

interface IUserData {
    username: string
    password: string
}

interface IErrorLogin {
    username: string
    password: string
}

export function FormLogin() {
    const [userData, setUserData] = useState<IUserData>({ username: "", password: "" })
    const [errorLogin, setErrorLogin] = useState<IErrorLogin>({ username: "", password: "" })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const HandleChageData = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const name = e.currentTarget.name as "username" | "password"
        setUserData({ ...userData, [name]: value })
        setErrorLogin({ ...errorLogin, [name]: false })
    }

    const HandleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const data = e.currentTarget.elements
        const username = (data.namedItem("username") as HTMLInputElement).value
        const password = (data.namedItem("password") as HTMLInputElement).value

        const response = await ValidateLogin(username, password)

        if (!response.success) {
            if (response.status_code === 30) {
                setErrorLogin({ username: "", password: "Nombre de usuario y/o contraseña no válidos." })
            } else if (response.status_code === 1) {
                setErrorLogin({ username: response.error_username, password: response.error_password })
            }
            setLoading(false)
        } else {
            const sessionID = response.session_id
            const responseAccount = await GetDetailsAccount(sessionID)
            if (responseAccount) {
                const newSession: IUserSession = {
                    language: responseAccount.iso_639_1,
                    country: responseAccount.iso_3166_1,
                    include_adult: responseAccount.include_adult,
                    name: responseAccount.name,
                    username: responseAccount.username,
                    session_id: sessionID
                }
                localStorage.setItem("tvmoviehub_sessionid", JSON.stringify(newSession))
                await CreateCookie(newSession.session_id)
                setLoading(false)
                router.push(`/`)
            }
        }
    }

    return (
        <form className={styles.form} onSubmit={HandleSubmit}>
            <LogInIcon className={styles.form_icon} />
            <TextBox label="Usuario" name="username" type="text" error={errorLogin?.username} onChange={HandleChageData} />
            <div className={styles.form_group}>
                <TextBox label="Contraseña" name="password" type="password" error={errorLogin?.password} onChange={HandleChageData} />
                <Link className={styles.form_link} href="https://www.themoviedb.org/reset-password" title="Re-establecer contraseña">Re-establecer contraseña</Link>
            </div>
            <Button mode="button" text={loading ? "Cargando..." : "Iniciar Sesión"} className={styles.form_button} />
            <footer className={styles.footer}>
                <span className={styles.footer_text}>Si no tienes una cuenta, registrarse para obtenerla es gratis y simple.
                    <Link className={styles.footer_link} href="https://www.themoviedb.org/signup" title="Re-establecer contraseña">Click aqui.</Link></span>
            </footer>
        </form>
    )
}