import Link from 'next/link'
import { getCurrentUser } from '@/lib/dal'
import { logout } from '@/actions/auth'

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-sky-600 text-white">
            ✈
          </span>
          <span>SkyBook</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Flights
          </Link>
          {user ? (
            <>
              <Link
                href="/bookings"
                className="rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                My bookings
              </Link>
              <span className="hidden max-w-40 truncate text-zinc-500 sm:inline dark:text-zinc-400">
                {user.name}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full bg-zinc-900 px-4 py-1.5 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-sky-600 px-4 py-1.5 text-white hover:bg-sky-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
