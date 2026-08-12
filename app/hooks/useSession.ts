/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { IUserSession } from "../interfaces/authentication"
import { usePathname } from "next/navigation"

const EMPTY_SESSION: IUserSession = {
    session_id: "",
    country: "",
    include_adult: false,
    language: "",
    name: "",
    username: ""
}

export function useSession() {
    const pathname = usePathname()
    const [session, setSession] = useState<IUserSession>(EMPTY_SESSION)

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            const storedSession = localStorage.getItem('tvmoviehub_sessionid')
            if (storedSession) {
                try {
                    const parsed: IUserSession = JSON.parse(storedSession)
                    setSession(prev => {
                        if (
                            prev.session_id === parsed.session_id &&
                            prev.username === parsed.username &&
                            prev.name === parsed.name
                        ) {
                            return prev
                        }
                        return parsed
                    })
                } catch {
                    setSession(prev => prev.session_id === "" ? prev : EMPTY_SESSION)
                }
            } else {
                setSession(prev => prev.session_id === "" ? prev : EMPTY_SESSION)
            }
        }
    }, [pathname])

    return session
}