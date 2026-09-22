'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getSessionUserId } from '@/lib/session'
import {
  createBookingRecord,
  findBookingById,
  cancelBookingRecord,
  countActiveSeatsForFlight,
} from '@/lib/db'
import { getFlightById } from '@/lib/flights'
import type { BookingFormState } from '@/lib/definitions'

export async function createBooking(
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const userId = await getSessionUserId()
  if (!userId) {
    redirect('/login')
  }

  const flightId = String(formData.get('flightId') ?? '')
  const passengers = Number(formData.get('passengers') ?? 1)
  const rawNames = String(formData.get('passengerNames') ?? '')
  const passengerNames = rawNames
    .split('\n')
    .map((n) => n.trim())
    .filter(Boolean)

  if (!flightId) return { message: 'Missing flight.' }
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 9) {
    return { message: 'Passengers must be between 1 and 9.' }
  }

  const flight = getFlightById(flightId)
  if (!flight) return { message: 'Flight not found.' }

  const alreadyTaken = await countActiveSeatsForFlight(flightId)
  if (alreadyTaken + passengers > flight.seatsLeft) {
    return { message: 'Not enough seats left on this flight.' }
  }

  const names =
    passengerNames.length > 0
      ? passengerNames.slice(0, passengers)
      : Array.from({ length: passengers }, (_, i) => `Passenger ${i + 1}`)

  await createBookingRecord({
    userId,
    flightId,
    passengers,
    passengerNames: names,
    totalPrice: flight.price * passengers,
  })

  revalidatePath('/bookings')
  redirect('/bookings')
}

export async function cancelBooking(bookingId: string): Promise<void> {
  const userId = await getSessionUserId()
  if (!userId) {
    redirect('/login')
  }
  const booking = await findBookingById(bookingId)
  if (!booking || booking.userId !== userId) {
    throw new Error('Booking not found.')
  }
  if (booking.status !== 'cancelled') {
    await cancelBookingRecord(bookingId)
  }
  revalidatePath('/bookings')
  redirect('/bookings')
}
