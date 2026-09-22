import { Suspense } from 'react'
import Link from 'next/link'
import SearchForm from '@/components/SearchForm'
import FlightCard from '@/components/FlightCard'
import { searchFlights } from '@/lib/flights'

type Props = {
  searchParams: Promise<{
    from?: string
    to?: string
    date?: string
    passengers?: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams
  const passengers = Math.min(
    Math.max(Number(params.passengers ?? 1) || 1, 1),
    9
  )
  const results = searchFlights({
    from: params.from || undefined,
    to: params.to || undefined,
    date: params.date || undefined,
    passengers,
  })
  const hasFilter = Boolean(params.from || params.to || params.date)

  return (
    <div className="grid gap-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Find your next flight
        </h1>
        <p className="mt-1 text-zinc-500">
          Search demo flights, pick one, and book it. Sign up or log in to
          manage your bookings.
        </p>
      </section>

      <Suspense fallback={<div className="text-sm">Loading search…</div>}>
        <SearchForm />
      </Suspense>

      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {hasFilter ? `Results (${results.length})` : 'All flights'}
          </h2>
          {hasFilter && (
            <Link href="/" className="text-sm text-sky-600 hover:underline">
              Clear filters
            </Link>
          )}
        </div>
        {results.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
            No flights match your search. Try different airports or dates.
          </p>
        ) : (
          results.map((f) => (
            <FlightCard key={f.id} flight={f} passengers={passengers} />
          ))
        )}
      </section>
    </div>
  )
}
