import { RegisterForm } from '@/components/AuthForms'

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-zinc-500">
        One account for searching, booking, and managing trips.
      </p>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <RegisterForm />
      </div>
    </div>
  )
}
