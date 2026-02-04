import { NextRequest, NextResponse } from "next/server";
import { tokenName } from "./constants";

export function middleware(request: NextRequest) {
    const token = request.cookies.get(tokenName)?.value;

    const publicPaths = ['/login', '/register'];

    const currentPath = request.nextUrl.pathname;

    if (!publicPaths.includes(currentPath) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if ((currentPath == '/login' && token) || (currentPath == '/register' && token)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}