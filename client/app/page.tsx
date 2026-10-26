"use client";

import { useEffect, useState } from "react";

type RandomVerse = {
  text: string;
  book: number;
  chapter: number;
  verse: number;
};

export default function Page() {
  const [verses, setVerses] = useState<RandomVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVerses() {
      try {
        const requests = Array.from({ length: 5 }, async () => {
          const response = await fetch(
            "https://bolls.life/get-random-verse/UBIO/",
          );

          if (!response.ok) {
            throw new Error("Failed to fetch a verse.");
          }

          return (await response.json()) as RandomVerse;
        });

        const data = await Promise.all(requests);
        setVerses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVerses();
  }, []);

  if (loading) {
    return (
      <main className="grid h-dvh place-items-center bg-neutral-950 text-white">
        Завантаження...
      </main>
    );
  }

  if (verses.length === 0) {
    return (
      <main className="grid h-dvh place-items-center bg-neutral-950 text-white">
        Не вдалося завантажити вірші.
      </main>
    );
  }

  return (
    <main className="h-dvh snap-y snap-mandatory overflow-y-auto bg-neutral-950 text-white">
      {verses.map((verse, index) => (
        <section
          key={`${verse.book}-${verse.chapter}-${verse.verse}-${index}`}
          className="relative flex h-dvh snap-start items-center justify-center px-8 py-16"
        >
          <p className="absolute left-6 top-6 text-sm font-semibold tracking-widest text-white/60">
            СЛОВО
          </p>

          <article className="mx-auto max-w-3xl text-center">
            <p className="text-3xl leading-relaxed font-medium sm:text-4xl md:text-5xl">
              {verse.text.replace(/<[^>]*>/g, "")}
            </p>

            <p className="mt-8 text-sm text-white/50">
              Книга {verse.book} · {verse.chapter}:{verse.verse}
            </p>
          </article>

          <p className="absolute bottom-8 text-xs text-white/40">
            Гортай, щоб читати далі
          </p>
        </section>
      ))}
    </main>
  );
}
