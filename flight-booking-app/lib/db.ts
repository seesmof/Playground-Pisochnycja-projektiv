import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

export type User = {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

export type BookingStatus = 'confirmed' | 'cancelled'

export type Booking = {
  id: string
  userId: string
  flightId: string
  passengers: number
  passengerNames: string[]
  totalPrice: number
  status: BookingStatus
  createdAt: string
}

type DbShape = {
  users: User[]
  bookings: Booking[]
}

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

async function ensureDb(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<DbShape>
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
    }
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
    const empty: DbShape = { users: [], bookings: [] }
    await fs.writeFile(DB_PATH, JSON.stringify(empty, null, 2))
    return empty
  }
}

async function saveDb(db: DbShape): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await ensureDb()
  return (
    db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
  )
}

export async function findUserById(id: string): Promise<User | null> {
  const db = await ensureDb()
  return db.users.find((u) => u.id === id) ?? null
}

export async function createUser(data: {
  name: string
  email: string
  passwordHash: string
}): Promise<User> {
  const db = await ensureDb()
  const user: User = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    passwordHash: data.passwordHash,
    createdAt: new Date().toISOString(),
  }
  db.users.push(user)
  await saveDb(db)
  return user
}

export async function createBookingRecord(data: {
  userId: string
  flightId: string
  passengers: number
  passengerNames: string[]
  totalPrice: number
}): Promise<Booking> {
  const db = await ensureDb()
  const booking: Booking = {
    id: randomUUID(),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    ...data,
  }
  db.bookings.push(booking)
  await saveDb(db)
  return booking
}

export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  const db = await ensureDb()
  return db.bookings
    .filter((b) => b.userId === userId)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}

export async function findBookingById(id: string): Promise<Booking | null> {
  const db = await ensureDb()
  return db.bookings.find((b) => b.id === id) ?? null
}

export async function cancelBookingRecord(id: string): Promise<Booking | null> {
  const db = await ensureDb()
  const booking = db.bookings.find((b) => b.id === id)
  if (!booking) return null
  booking.status = 'cancelled'
  await saveDb(db)
  return booking
}

export async function countActiveSeatsForFlight(
  flightId: string
): Promise<number> {
  const db = await ensureDb()
  return db.bookings
    .filter((b) => b.flightId === flightId && b.status === 'confirmed')
    .reduce((sum, b) => sum + b.passengers, 0)
}
