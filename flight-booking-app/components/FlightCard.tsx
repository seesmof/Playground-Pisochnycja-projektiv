import Link from 'next/link'
import {
  airportCity,
  formatDateTime,
  formatDuration,
  type Flight,
} from '@/lib/flights'

export default function FlightCard({
  flight,
  passengers = 1,
}: {
  flight: Flight
  passengers?: number
}) {
  const total = flight.price * passengers

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex-1">
        <p className="text-sm text-zinc-500">
          {flight.airline} · {flight.flightNumber} · {flight.aircraft}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div>
            <p className="text-2xl font-bold">{flight.from}</p>
            <p className="text-xs text-zinc-500">{airportCity(flight.from)}</p>
          </div>
          <div className="flex-1 text-center text-xs text-zinc-500">
            <p>{formatDuration(flight.durationMinutes)}</p>
            <div className="my-1 border-t border-dashed border-zinc-300 dark:border-zinc-700" />
            <p>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{flight.to}</p>
            <p className="text-xs text-zinc-500">{airportCity(flight.to)}</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {formatDateTime(flight.departure)} → {formatDateTime(flight.arrival)}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {flight.seatsLeft} seats left
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-2xl font-bold">${total}</p>
          <p className="text-xs text-zinc-500">
            ${flight.price} × {passengers}
          </p>
        </div>
        <Link
          href={`/flights/${flight.id}?passengers=${passengers}`}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500"
        >
          Select
        </Link>
      </div>
    </article>
  )
}
