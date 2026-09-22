'use client'

import { useTransition } from 'react'
import { cancelBooking } from '@/actions/bookings'

export default function CancelButton({ bookingId }: { bookingId: string }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm('Cancel this booking?')) {
          startTransition(() => cancelBooking(bookingId))
        }
      }}
      className="rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950"
    >
      {pending ? 'Cancelling…' : 'Cancel'}
    </button>
  )
}
