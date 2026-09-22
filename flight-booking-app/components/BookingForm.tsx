'use client'

import { useActionState, useState } from 'react'
import { createBooking } from '@/actions/bookings'

export default function BookingForm({
  flightId,
  passengers: initialPassengers,
  isAuthed,
}: {
  flightId: string
  passengers: number
  isAuthed: boolean
}) {
  const [state, action, pending] = useActionState(createBooking, undefined)
  const [passengers, setPassengers] = useState(initialPassengers)

  return (
    <form
      action={action}
      className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <input type="hidden" name="flightId" value={flightId} />
      <h2 className="text-lg font-semibold">Book this flight</h2>
      <label className="grid gap-1 text-sm">
        <span>Passengers (1–9)</span>
        <input
          name="passengers"
          type="number"
          min={1}
          max={9}
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span>Passenger names (one per line, optional)</span>
        <textarea
          name="passengerNames"
          rows={passengers > 3 ? passengers : 3}
          placeholder={'Ada Lovelace\nAlan Turing'}
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>
      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
      {!isAuthed && (
        <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          You need to log in to complete the booking. You will be redirected to
          the login page.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
      >
        {pending ? 'Booking…' : 'Confirm booking'}
      </button>
    </form>
  )
}
