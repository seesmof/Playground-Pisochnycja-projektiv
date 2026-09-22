'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'
import { hashPassword, verifyPassword } from '@/lib/password'
import { findUserByEmail, createUser } from '@/lib/db'
import type { AuthFormState } from '@/lib/definitions'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  const errors: NonNullable<NonNullable<AuthFormState>['errors']> = {}
  if (name.length < 2) errors.name = ['Name must be at least 2 characters.']
  if (!validateEmail(email)) errors.email = ['Please enter a valid email.']
  if (password.length < 8)
    errors.password = ['Password must be at least 8 characters long.']
  if (Object.keys(errors).length > 0) return { errors }

  const existing = await findUserByEmail(email)
  if (existing) {
    return {
      errors: { email: ['An account with this email already exists.'] },
    }
  }

  const passwordHash = await hashPassword(password)
  const user = await createUser({ name, email, passwordHash })

  await createSession(user.id)
  redirect('/')
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!validateEmail(email) || !password) {
    return { message: 'Please enter a valid email and password.' }
  }

  const user = await findUserByEmail(email)
  if (!user) {
    return { message: 'Invalid email or password.' }
  }

  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) {
    return { message: 'Invalid email or password.' }
  }

  await createSession(user.id)
  redirect('/')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/login')
}
