import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let myTokenLogin = request.cookies.get("session_tvmoviehub")

    const { pathname } = request.nextUrl

    console.log("Middleware - pathname:", pathname)
    console.log("Middleware - myTokenLogin:", myTokenLogin)

    if (pathname.startsWith("/favorites")) {
        console.log("Middleware - favorites check - myTokenLogin:", myTokenLogin)
        if (myTokenLogin === undefined) {
            console.log("Middleware - redirecting to /")
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            console.log("Middleware - allowing favorites")
            return NextResponse.next()
        }
    }

    if (pathname.startsWith("/lists")) {
        console.log("Middleware - lists check - myTokenLogin:", myTokenLogin)
        if (myTokenLogin === undefined) {
            console.log("Middleware - redirecting to /")
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            console.log("Middleware - allowing lists")
            return NextResponse.next()
        }
    }

    if (pathname.startsWith("/account")) {
        console.log("Middleware - account check - myTokenLogin:", myTokenLogin)
        if (myTokenLogin === undefined) {
            console.log("Middleware - redirecting to /")
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            console.log("Middleware - allowing account")
            return NextResponse.next()
        }
    }

    if (pathname.startsWith("/watchlist")) {
        console.log("Middleware - watchlist check - myTokenLogin:", myTokenLogin)
        if (myTokenLogin === undefined) {
            console.log("Middleware - redirecting to /")
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            console.log("Middleware - allowing watchlist")
            return NextResponse.next()
        }
    }

    if (pathname.startsWith("/login")) {
        console.log("Middleware - login check - myTokenLogin:", myTokenLogin)
        if (myTokenLogin !== undefined) {
            console.log("Middleware - redirecting to /")
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            console.log("Middleware - allowing login")
            return NextResponse.next()
        }
    }

    console.log("Middleware - passing through")
    return NextResponse.next()
}