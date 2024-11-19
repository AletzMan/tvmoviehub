/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { IUserSession } from "../interfaces/authentication"
import { usePathname } from "next/navigation"


export function useSession() {
    const pathname = usePathname()
    const [session, setSession] = useState<IUserSession>({ session_id: "", country: "", include_adult: false, language: "", name: "", username: "" })

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            const storedSession = localStorage.getItem('tvmoviehub_sessionid')
            if (storedSession) {
                setSession(JSON.parse(storedSession))
            } else {
                setSession({
                    session_id: "",
                    country: "",
                    include_adult: false,
                    language: "",
                    name: "",
                    username: "",
                })
            }
        }
    }, [pathname])

    return session
}