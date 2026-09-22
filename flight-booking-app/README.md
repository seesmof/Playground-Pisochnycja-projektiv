# SkyBook — Next.js Flight Booking Demo

Search demo flights, create an account, book trips, and manage them.

## Stack

- Next.js 16 (App Router) + React 19 + Tailwind CSS v4
- Cookie-session auth: `jose` JWT in an `httpOnly` cookie, password hashing with
  Node `scrypt`, no external auth provider or database
- Data: static flight catalog in `lib/flights.ts`, users + bookings in
  `data/db.json` (JSON file store, git-ignored)

## Getting started

```bash
cd flight-booking-app
cp .env.example .env.local
# put a random value in SESSION_SECRET:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

npm install
npm run dev
# open http://localhost:3000
```

## What to try

1. Search flights on `/` (origin, destination, date, passengers).
2. `/register` → create an account (stored in `data/db.json`).
3. Pick a flight → `/flights/[id]` → confirm booking → redirected to `/bookings`.
4. `/bookings` → cancel trips. `/bookings` is protected by `proxy.ts`.
5. Log out from the navbar.

## Project layout

- `app/page.tsx` — flight search + results (reads `searchParams`)
- `app/flights/[id]/page.tsx` — flight detail + booking form
- `app/bookings/page.tsx` — protected bookings list
- `app/login`, `app/register` — auth pages with `useActionState` forms
- `actions/auth.ts` — signup / login / logout Server Actions
- `actions/bookings.ts` — create / cancel booking Server Actions
- `lib/jwt.ts`, `lib/session.ts` — stateless session (cookie + JWT)
- `lib/dal.ts` — `getCurrentUser` / `verifySession` / `requireUser`
- `lib/db.ts` — JSON file store for users + bookings
- `lib/flights.ts` — demo flight catalog + search
- `proxy.ts` — optimistic route protection for `/bookings`
