import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { AddIcon, ListIcon } from "../utils/svg"
import ListMovies from "./components/ListMovies"
import { FormAddMovie } from "./components/FormAddMovie"
import styles from "./lists.module.scss"
import { cookies } from "next/headers"
import { GetLists } from "@/app/services/fetchData"
import { IResponseListMovie } from "@/app/interfaces/list"
import ListPageContent from "./components/ListPageContent"

async function ListMoviesWrapper({ searchParams }: { searchParams: { type: string, page: string } }) {
    const cookie = (await cookies()).get("session_tvmoviehub")?.value
    const lists: IResponseListMovie | null = await GetLists(cookie as string, searchParams)
    return <ListMovies lists={lists} searchParams={searchParams} />
}

export default async function Page({ searchParams }: { searchParams: Promise<{ type: string, page: string }> }) {
    const params = await searchParams

    return (
        <ListPageContent searchParams={params}>
            <ListMoviesWrapper searchParams={params} />
        </ListPageContent>
    );
}