import { LoginForm } from '@/components/AuthForms'

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Log in to book flights and see your trips.
      </p>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <LoginForm />
      </div>
    </div>
  )
}
