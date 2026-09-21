"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LISTS,
  LIST_LENGTHS,
  dayNumberForDates,
  formatReading,
  getReadingsForDay,
} from "./horner";

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISODate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function HomePage() {
  const [dayInput, setDayInput] = useState("1");
  const [startDate, setStartDate] = useState(() => toISODate(new Date()));
  const [targetDate, setTargetDate] = useState(() => toISODate(new Date()));
  const [copied, setCopied] = useState(false);

  // Deep-link support: /?day=42
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("day");
    if (d && /^\d+$/.test(d)) {
      const n = Math.max(1, parseInt(d, 10));
      setDayInput(String(n));
    }
  }, []);

  const day = useMemo(() => {
    const n = Math.floor(Number(dayInput));
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, [dayInput]);

  const readings = useMemo(() => getReadingsForDay(day), [day]);

  // Keep URL shareable without a router dependency.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("day", String(day));
    window.history.replaceState(null, "", url.toString());
  }, [day]);

  const applyDates = () => {
    const s = parseISODate(startDate);
    const t = parseISODate(targetDate);
    if (!s || !t) return;
    setDayInput(String(Math.max(1, dayNumberForDates(s, t))));
  };

  const copyList = async () => {
    const text = `Grant Horner plan — Day ${day}\n${readings
      .map((r) => `List ${r.listId} (${r.listTitle}): ${formatReading(r)}`)
      .join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const step = (delta: number) => setDayInput(String(Math.max(1, day + delta)));

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <header className="rounded-lg bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">
            Grant Horner&apos;s Bible Reading Plan — Daily Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            10 chapters a day, one from each of the 10 lists. Every list loops
            independently, so Day 1 starts every list at chapter 1 and each list
            wraps on its own schedule.
          </p>
        </header>

        <section className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="font-semibold">1. Pick a plan day</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => step(-1)}
              className="rounded border px-3 py-2 text-sm hover:bg-slate-100"
              aria-label="Previous day"
            >
              ← Prev
            </button>
            <label className="text-sm">
              Day{" "}
              <input
                value={dayInput}
                onChange={(e) =>
                  setDayInput(e.target.value.replace(/[^0-9]/g, ""))
                }
                inputMode="numeric"
                className="w-24 rounded border px-2 py-2 text-center"
              />
            </label>
            <button
              onClick={() => step(1)}
              className="rounded border px-3 py-2 text-sm hover:bg-slate-100"
              aria-label="Next day"
            >
              Next →
            </button>
            <button
              onClick={copyList}
              className="rounded bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
            >
              {copied ? "Copied!" : "Copy list"}
            </button>
          </div>

          <h2 className="mt-6 font-semibold">
            2. Or compute the day from calendar dates
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <label>
              Start (Day 1){" "}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded border px-2 py-2"
              />
            </label>
            <label>
              Target date{" "}
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="rounded border px-2 py-2"
              />
            </label>
            <button
              onClick={applyDates}
              className="rounded border px-3 py-2 hover:bg-slate-100"
            >
              Calculate day
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-bold">Day {day} — your 10 chapters</h2>
          <ol className="mt-4 divide-y">
            {readings.map((r) => (
              <li key={r.listId} className="flex items-baseline gap-3 py-2">
                <span className="w-14 shrink-0 text-xs font-semibold text-slate-500">
                  LIST {r.listId}
                </span>
                <div className="min-w-0">
                  <div className="font-medium">
                    {r.bookName} {r.chapter}
                  </div>
                  <div className="text-xs text-slate-500">
                    {r.listTitle} · chapter {r.positionInList} of{" "}
                    {r.listLength}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 rounded-lg bg-white p-6 shadow text-sm text-slate-700">
          <h2 className="font-semibold text-slate-900">How it works</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {LISTS.map((l, i) => (
              <li key={l.id}>
                List {l.id} ({l.title}, {LIST_LENGTHS[i]} ch):{" "}
                {l.books.map((b) => b.name).join(", ")}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Formula: reading for list L on day N = chapter at index (N − 1) mod
            (length of L). So e.g. Proverbs (31 chapters) restarts every 31
            days, while Psalms (150 chapters) restarts every 150 days.
          </p>
        </section>
      </main>
    </div>
  );
}
