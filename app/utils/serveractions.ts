"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"


export async function CreateCookie(IUserSession: string) {
    cookies().set("session_tvmoviehub", IUserSession)
}

export async function DeleteCookie() {
    cookies().delete("session_tvmoviehub")
}



export async function RevalidateURL(tag: string) {
    revalidateTag(tag)
}
