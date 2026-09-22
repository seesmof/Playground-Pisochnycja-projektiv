import 'server-only'
import { cookies } from 'next/headers'
import { encrypt, decrypt } from '@/lib/jwt'

const COOKIE_NAME = 'session'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt: expiresAt.toISOString() })
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)?.value
  const payload = await decrypt(session)
  if (!payload?.userId) return null
  if (payload.expiresAt && new Date(payload.expiresAt) < new Date()) return null
  return payload.userId
}
