import { useEffect, useState } from "react"
import { IUserSession } from "../interfaces/authentication"
import { usePathname } from "next/navigation"


export function useSession() {
    const pathname = usePathname()
    const [session, setSession] = useState<IUserSession>({ session_id: "", country: "", include_adult: false, language: "", name: "", username: "" })

    useEffect(() => {
        const responseSession = localStorage.getItem("tvmoviehub_sessionid")
        if (responseSession) {
            const session: IUserSession = JSON.parse(responseSession)
            if (session.session_id) {
                setSession(session)
            }
        } else {
            setSession({ session_id: "", country: "", include_adult: false, language: "", name: "", username: "" })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, localStorage.length])

    return session
}