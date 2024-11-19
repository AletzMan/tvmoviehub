import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let myTokenLogin = request.cookies.get("session_tvmoviehub")

    const { pathname } = request.nextUrl



    if (pathname.endsWith("/favorites")) {
        console.log(myTokenLogin)
        if (myTokenLogin === undefined) {
            request.nextUrl.pathname = "/"
            return NextResponse.redirect(request.nextUrl)
        } else {
            return NextResponse.next()
        }
    }

    if (pathname.endsWith("/lists")) {
        if (myTokenLogin === undefined) {
            request.nextUrl.pathname = "/"
            return NextResponse.redirect(request.nextUrl)
        } else {
            return NextResponse.next()
        }
    }

}