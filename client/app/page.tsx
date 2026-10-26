"use client";

import { useEffect, useState } from "react";

type RandomVerse = {
  text: string;
  book: number;
  chapter: number;
  verse: number;
};

const BIBLE_BOOK_NUMBER_TO_HOMENKO_BIBLE_NAME: Record<number, string> = {
  1: "Буття",
  2: "Вихід",
  3: "Левит",
  4: "Числа",
  5: "Второзаконня",
  6: "Iсус Навин",
  7: "Судді",
  8: "Рут",
  9: "I Самуїл",
  10: "II Самуїл",
  11: "I Царі",
  12: "II Царі",
  13: "I Хроніка",
  14: "II Хроніка",
  15: "Ездра",
  16: "Неємія",
  17: "Естера",
  18: "Іов",
  19: "Псалми",
  20: "Приповідки",
  21: "Проповідник",
  22: "Пісня пісень",
  23: "Ісая",
  24: "Єремiя",
  25: "Плач Єремiї",
  26: "Єзекiїль",
  27: "Даниїл",
  28: "Осiя",
  29: "Йоіл",
  30: "Амос",
  31: "Овдiй",
  32: "Йона",
  33: "Міхей",
  34: "Наум",
  35: "Авакум",
  36: "Софонiя",
  37: "Аггей",
  38: "Захарiя",
  39: "Малахія",
  40: "Матей",
  41: "Марко",
  42: "Лука",
  43: "Йоан",
  44: "Діяння",
  45: "До римлян",
  46: "I до Корінтян",
  47: "II до Корінтян",
  48: "До Галатiв",
  49: "До Ефесян",
  50: "До Филипʼян",
  51: "До Колосян",
  52: "I до Солунян",
  53: "II до Солунян",
  54: "I до Тимотея",
  55: "II до Тимотея",
  56: "До Тита",
  57: "До Филимона",
  58: "До євреїв",
  59: "Якова",
  60: "I Послання Петра",
  61: "II Послання Петра",
  62: "I Послання Йоана",
  63: "II Послання Йоана",
  64: "III Послання Йоана",
  65: "Послання Юди",
  66: "Обʼявлення",
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
      <main className="grid h-dvh place-items-center bg-white text-black">
        <p>Завантаження...</p>
      </main>
    );
  }

  if (verses.length === 0) {
    return (
      <main className="grid h-dvh place-items-center bg-white text-black">
        <p>Не вдалося завантажити вірші.</p>
      </main>
    );
  }

  return (
    <main className="h-dvh snap-y snap-mandatory overflow-y-auto bg-white text-black">
      {verses.map((verse, index) => (
        <section
          key={`${verse.book}-${verse.chapter}-${verse.verse}-${index}`}
          className="relative flex h-dvh snap-start items-center justify-center px-8 py-16"
        >
          <a
            href="https://bolls.life/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-6 top-6 text-sm text-black/60 underline underline-offset-4 hover:text-black"
          >
            Bolls.life
          </a>

          <article className="mx-auto max-w-3xl text-center">
            <p className="text-3xl leading-relaxed font-medium sm:text-4xl md:text-5xl">
              {verse.text.replace(/<[^>]*>/g, "")}
            </p>

            <p className="mt-8 text-sm text-black/50">
              {BIBLE_BOOK_NUMBER_TO_HOMENKO_BIBLE_NAME[verse.book] ??
                "Невідома книга"}{" "}
              {verse.chapter}:{verse.verse}
            </p>
          </article>

          <p className="absolute bottom-8 text-xs text-black/40">
            Гортай, щоб читати далі
          </p>
        </section>
      ))}
    </main>
  );
}
