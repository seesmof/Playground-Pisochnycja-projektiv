'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AIRPORTS } from '@/lib/flights'

export default function SearchForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [from, setFrom] = useState(params.get('from') ?? '')
  const [to, setTo] = useState(params.get('to') ?? '')
  const [date, setDate] = useState(params.get('date') ?? '')
  const [passengers, setPassengers] = useState(params.get('passengers') ?? '1')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = new URLSearchParams()
    if (from) q.set('from', from)
    if (to) q.set('to', to)
    if (date) q.set('date', date)
    if (passengers) q.set('passengers', passengers)
    router.push(`/?${q.toString()}`)
  }

  function swap() {
    setFrom(to)
    setTo(from)
  }

  const selectClass =
    'w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900'

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-end dark:border-zinc-800 dark:bg-zinc-950"
    >
      <label className="grid gap-1 text-sm">
        <span className="text-zinc-500">From</span>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass}>
          <option value="">Anywhere</option>
          {AIRPORTS.map((a) => (
            <option key={a.code} value={a.code}>
              {a.code} — {a.city}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end gap-2">
        <button
          type="button"
          onClick={swap}
          title="Swap origin and destination"
          className="mb-0.5 rounded-xl border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 md:mb-0 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          ⇄
        </button>
        <label className="grid flex-1 gap-1 text-sm">
          <span className="text-zinc-500">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className={selectClass}>
            <option value="">Anywhere</option>
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>
                {a.code} — {a.city}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        <span className="text-zinc-500">Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={selectClass}
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-zinc-500">Passengers</span>
        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className={selectClass}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500"
      >
        Search
      </button>
    </form>
  )
}
