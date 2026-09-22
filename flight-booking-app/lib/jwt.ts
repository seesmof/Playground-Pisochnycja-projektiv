import { SignJWT, jwtVerify } from 'jose'

export type SessionPayload = {
  userId: string
  expiresAt: string
}

function getSecretKey(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET ??
    'dev-only-secret-please-set-SESSION_SECRET-in-env-123456'
  if (!process.env.SESSION_SECRET) {
    console.warn(
      '[auth] SESSION_SECRET is not set. Using an insecure dev fallback. Set SESSION_SECRET in .env.local'
    )
  }
  return new TextEncoder().encode(secret)
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())
}

export async function decrypt(
  session: string | undefined | null
): Promise<SessionPayload | null> {
  if (!session) return null
  try {
    const { payload } = await jwtVerify(session, getSecretKey(), {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}
