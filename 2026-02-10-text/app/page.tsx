"use client";

import Verse from "@/components/Verse";
import Link from "next/link";
import { useState } from "react";

export interface IVerse {
  verseNumber: number;
  verseContent: string;
}

export default function Home() {
  const [verses, setVerses] = useState<IVerse[]>([
    {
      verseNumber: 1,
      verseContent:
        "Почуйте Мене, острови, і народи здалека, вважайте: Господь із утроби покликав Мене, Моє Ймення згадав з нутра неньки Моєї.",
    },
    {
      verseNumber: 2,
      verseContent:
        "І Мої уста вчинив Він, як той гострий меч, заховав Мене в тіні Своєї руки, і Мене вчинив за добірну стрілу, в Своїм сагайдаці заховав Він Мене.",
    },
    {
      verseNumber: 3,
      verseContent:
        "І до Мене прорік: Ти раб Мій, Ізраїлю, Яким Я прославлюсь!",
    },
    {
      verseNumber: 4,
      verseContent:
        "І Я відповів: Надаремно трудивсь Я, на порожнечу й марноту зужив Свою силу: Справді ж з Господом право Моє, і нагорода Моя з Моїм Богом.",
    },
    {
      verseNumber: 5,
      verseContent:
        "Тепер же промовив Господь, що Мене вформував Собі від живота за раба, щоб навернути Собі Якова, і щоб Ізраїль для Нього був зібраний. І був Я шанований в очах Господніх, а Мій Бог стався міццю Моєю.",
    },
    {
      verseNumber: 6,
      verseContent:
        "І Він сказав: Того мало, щоб був Ти Мені за раба, щоб відновити племена Якова, щоб вернути врятованих Ізраїля, але Я вчиню Тебе світлом народів, щоб був Ти спасінням Моїм аж до краю землі!",
    },
    {
      verseNumber: 7,
      verseContent:
        "Так говорить Господь, Відкупитель Ізраїлів, Святий його, до погордженого на душі, до обридженого від людей, до раба тих володарів: Побачать царі, і князі повстають, і поклоняться ради Господа, що вірний, ради Святого Ізраїлевого, що вибрав Тебе.",
    },
  ]);

  return (
    <div className="bg-linear-to-br to-sky-50 p-3 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow rounded-md p-3 max-w-xl">
        <h2 className="italic font-bold mb-2">Слуга Господній</h2>
        {verses.map((verse) => (
          <Verse
            key={verse.verseNumber}
            verseContent={verse.verseContent}
            verseNumber={verse.verseNumber}
          />
        ))}
        <p className="italic mt-2 text-right">
          <Link
            className="hover:underline underline-offset-4"
            href={
              "https://www.biblegateway.com/passage/?search=Isaiah%2049&version=UKR,NIV"
            }
          >
            Ісая 49:1-7
          </Link>
        </p>
      </div>
    </div>
  );
}
