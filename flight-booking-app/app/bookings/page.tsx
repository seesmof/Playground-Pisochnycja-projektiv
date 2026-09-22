import Link from 'next/link'
import CancelButton from '@/components/CancelButton'
import { requireUser } from '@/lib/dal'
import { getBookingsByUser } from '@/lib/db'
import {
  getFlightById,
  formatDateTime,
  airportCity,
} from '@/lib/flights'

export default async function BookingsPage() {
  const user = await requireUser()
  const bookings = await getBookingsByUser(user.id)
  const active = bookings.filter((b) => b.status === 'confirmed')
  const cancelled = bookings.filter((b) => b.status === 'cancelled')

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">My bookings</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {user.name} · {active.length} upcoming trip{active.length === 1 ? '' : 's'}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">No bookings yet.</p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500"
          >
            Find a flight
          </Link>
        </div>
      ) : (
        <>
          <section className="grid gap-3">
            {active.map((b) => {
              const flight = getFlightById(b.flightId)
              return (
                <article
                  key={b.id}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div>
                    <p className="font-semibold">
                      {flight
                        ? `${flight.from} → ${flight.to} · ${flight.airline} ${flight.flightNumber}`
                        : b.flightId}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {flight
                        ? `${formatDateTime(flight.departure)} · ${airportCity(flight.from)} → ${airportCity(flight.to)}`
                        : ''}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {b.passengers} passenger{b.passengers === 1 ? '' : 's'} · $
                      {b.totalPrice} total · booked{' '}
                      {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {b.passengerNames.join(', ')}
                    </p>
                  </div>
                  <CancelButton bookingId={b.id} />
                </article>
              )
            })}
          </section>

          {cancelled.length > 0 && (
            <section className="grid gap-3">
              <h2 className="text-sm font-semibold text-zinc-500">
                Cancelled ({cancelled.length})
              </h2>
              {cancelled.map((b) => {
                const flight = getFlightById(b.flightId)
                return (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-500 opacity-70 dark:border-zinc-800"
                  >
                    {flight ? `${flight.from} → ${flight.to}` : b.flightId} ·{' '}
                    {b.passengers} pax · ${b.totalPrice} · cancelled
                  </div>
                )
              })}
            </section>
          )}
        </>
      )}
    </div>
  )
}
