import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/jwt'

const PROTECTED_PREFIXES = ['/bookings']
const AUTH_PAGES = ['/login', '/register']

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const sessionCookie = req.cookies.get('session')?.value
  const session = await decrypt(sessionCookie)
  const isAuthed = Boolean(session?.userId)

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
  if (isProtected && !isAuthed) {
    const url = new URL('/login', req.nextUrl)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthed && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
