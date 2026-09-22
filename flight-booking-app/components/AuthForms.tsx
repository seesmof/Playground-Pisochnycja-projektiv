"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup } from "@/actions/auth";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";
const labelClass = "grid gap-1 text-sm";
const errorClass = "text-sm text-red-600";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="grid gap-4">
      <label className={labelClass}>
        <span>Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        <span>Password</span>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className={inputClass}
        />
      </label>
      {state?.message && <p className={errorClass}>{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
      >
        {pending ? "Logging in…" : "Log in"}
      </button>
      <p className="text-sm text-zinc-500">
        No account?{" "}
        <Link href="/register" className="text-sky-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="grid gap-4">
      <label className={labelClass}>
        <span>Name</span>
        <input
          name="name"
          type="text"
          required
          placeholder="Ada Lovelace"
          className={inputClass}
        />
        {state?.errors?.name && (
          <span className={errorClass}>{state.errors.name[0]}</span>
        )}
      </label>
      <label className={labelClass}>
        <span>Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
        {state?.errors?.email && (
          <span className={errorClass}>{state.errors.email[0]}</span>
        )}
      </label>
      <label className={labelClass}>
        <span>Password (min. 8 characters)</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="••••••••"
          className={inputClass}
        />
        {state?.errors?.password && (
          <span className={errorClass}>{state.errors.password[0]}</span>
        )}
      </label>
      {state?.message && <p className={errorClass}>{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
      <p className="text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-sky-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
