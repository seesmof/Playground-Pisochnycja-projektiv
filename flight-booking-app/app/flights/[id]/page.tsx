import Link from 'next/link'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/BookingForm'
import { getFlightById, airportCity, formatDateTime, formatDuration } from '@/lib/flights'
import { getCurrentUser } from '@/lib/dal'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ passengers?: string }>
}

export default async function FlightPage({ params, searchParams }: Props) {
  const { id } = await params
  const query = await searchParams
  const flight = getFlightById(id)
  if (!flight) notFound()

  const passengers = Math.min(
    Math.max(Number(query.passengers ?? 1) || 1, 1),
    9
  )
  const user = await getCurrentUser()

  return (
    <div className="grid gap-6">
      <Link href="/" className="text-sm text-sky-600 hover:underline">
        ← Back to search
      </Link>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500">
          {flight.airline} · {flight.flightNumber} · {flight.aircraft}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <div>
            <p className="text-4xl font-bold">{flight.from}</p>
            <p className="text-sm text-zinc-500">{airportCity(flight.from)}</p>
            <p className="mt-1 text-sm">{formatDateTime(flight.departure)}</p>
          </div>
          <div className="flex-1 text-center text-sm text-zinc-500">
            <p>{formatDuration(flight.durationMinutes)}</p>
            <div className="my-2 border-t border-dashed border-zinc-300 dark:border-zinc-700" />
            <p>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{flight.to}</p>
            <p className="text-sm text-zinc-500">{airportCity(flight.to)}</p>
            <p className="mt-1 text-sm">{formatDateTime(flight.arrival)}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
          <span>
            <strong>${flight.price}</strong> per passenger
          </span>
          <span className="text-zinc-500">
            {flight.seatsLeft} seats left · {flight.seatsTotal} total
          </span>
          <span className="text-zinc-500">
            Total for {passengers}: <strong>${flight.price * passengers}</strong>
          </span>
        </div>
      </div>

      <BookingForm
        flightId={flight.id}
        passengers={passengers}
        isAuthed={Boolean(user)}
      />
    </div>
  )
}
