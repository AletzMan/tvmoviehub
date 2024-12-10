


import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { AccountIcon, TimeIcon } from "../utils/svg"
import { GetDetailsAccount } from "../services/fetchData"
import { cookies } from "next/headers"



export default async function Page() {
    const cookie = cookies().get("session_tvmoviehub")?.value
    const data = await GetDetailsAccount(cookie || "")


    const handleCalculate = () => {
    }

    return (
        <section>
            <HeaderSection title="Mi cuenta" icon={<AccountIcon />} />
            <span>{data?.id}</span>
            <span>{data?.name}</span>
            <span>{data?.username}</span>
        </section>
    )
}