"use client";

import { useEffect, useMemo, useState } from "react";

type Verse = { book: string; chapter: number; verse: number; text: string };

const BOOK_NAMES: Record<string, string> = {
  GEN: "Буття", EXO: "Вихід", LEV: "Левит", NUM: "Числа", DEU: "Повторення Закону",
  JOS: "Ісуса Навина", JDG: "Суддів", RUT: "Рут", "1SA": "1 Самуїла", "2SA": "2 Самуїла",
  "1KI": "1 Царів", "2KI": "2 Царів", "1CH": "1 Хронік", "2CH": "2 Хронік", EZR: "Ездра",
  NEH: "Неемія", EST: "Естер", JOB: "Йова", PSA: "Псалми", PRO: "Приповісті",
  ECC: "Еклезіаст", SNG: "Пісня над піснями", ISA: "Ісаї", JER: "Єремії", LAM: "Плач Єремії",
  EZK: "Єзекіїля", DAN: "Даниїла", HOS: "Осії", JOL: "Йоіла", AMO: "Амоса",
  OBA: "Обадії", JON: "Йони", MIC: "Михея", NAM: "Наума", HAB: "Авакума", ZEP: "Софонії",
  HAG: "Огія", ZEC: "Захарії", MAL: "Малахії", MAT: "Матвія", MRK: "Марка", LUK: "Луки",
  JHN: "Івана", ACT: "Дії", ROM: "Римлян", "1CO": "1 Коринтян", "2CO": "2 Коринтян",
  GAL: "Галатів", EPH: "Ефесян", PHP: "Филип'ян", COL: "Колоссян", "1TH": "1 Солунян",
  "2TH": "2 Солунян", "1TI": "1 Тимофія", "2TI": "2 Тимофія", TIT: "Тита", PHM: "Филимона",
  HEB: "Євреїв", JAS: "Якова", "1PE": "1 Петра", "2PE": "2 Петра", "1JN": "1 Івана",
  "2JN": "2 Івана", "3JN": "3 Івана", JUD: "Юди", REV: "Об'явлення",
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function Page() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState("JHN");
  const [chapter, setChapter] = useState(3);
  const [verseNum, setVerseNum] = useState(16);
  const [hidden, setHidden] = useState(false);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/bible.txt")
      .then((r) => r.text())
      .then((t) => {
        const out: Verse[] = [];
        for (const line of t.split(/\r?\n/)) {
          const m = line.match(/^(\S+)\s+(\d+):(\d+)\s+(.*)$/);
          if (!m) continue;
          out.push({ book: m[1], chapter: +m[2], verse: +m[3], text: m[4].trim() });
        }
        setVerses(out);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mastered");
      if (raw) setMastered(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const books = useMemo(() => {
    const s = new Set(verses.map((v) => v.book));
    return [...s];
  }, [verses]);

  const chapters = useMemo(() => {
    const s = new Set(verses.filter((v) => v.book === book).map((v) => v.chapter));
    return [...s].sort((a, b) => a - b);
  }, [verses, book]);

  const versesInChapter = useMemo(
    () => verses.filter((v) => v.book === book && v.chapter === chapter).sort((a, b) => a.verse - b.verse),
    [verses, book, chapter]
  );

  const current = verses.find((v) => v.book === book && v.chapter === chapter && v.verse === verseNum);

  useEffect(() => {
    if (chapters.length && !chapters.includes(chapter)) setChapter(chapters[0]);
  }, [chapters, chapter]);

  useEffect(() => {
    if (versesInChapter.length && !versesInChapter.find((v) => v.verse === verseNum))
      setVerseNum(versesInChapter[0].verse);
  }, [versesInChapter, verseNum]);

  const ref = current ? `${BOOK_NAMES[book] ?? book} ${chapter}:${verseNum}` : "";

  const cloze = current
    ? current.text
        .split(/\s+/)
        .map((w) => w[0] + "…")
        .join(" ")
    : "";

  function check() {
    setChecked(true);
  }

  const ok = current && normalize(typed) === normalize(current.text);

  function toggleMastered() {
    if (!current) return;
    const key = `${book} ${chapter}:${verseNum}`;
    const next = new Set(mastered);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setMastered(next);
    localStorage.setItem("mastered", JSON.stringify([...next]));
  }

  const isMastered = current ? mastered.has(`${book} ${chapter}:${verseNum}`) : false;

  if (loading) return <main className="p-6">Завантаження Біблії…</main>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Запам'ятовування Біблії</h1>

      <div className="flex gap-2 flex-wrap">
        <select className="border rounded p-2" value={book} onChange={(e) => setBook(e.target.value)}>
          {books.map((b) => (
            <option key={b} value={b}>{BOOK_NAMES[b] ?? b}</option>
          ))}
        </select>
        <select className="border rounded p-2" value={chapter} onChange={(e) => setChapter(+e.target.value)}>
          {chapters.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="border rounded p-2" value={verseNum} onChange={(e) => setVerseNum(+e.target.value)}>
          {versesInChapter.map((v) => (
            <option key={v.verse} value={v.verse}>{v.verse}</option>
          ))}
        </select>
      </div>

      {current && (
        <div className="border rounded p-4 space-y-2">
          <div className="font-semibold">{ref}</div>
          <div className="text-lg leading-relaxed">
            {hidden ? cloze : current.text}
          </div>
          <button className="text-sm underline" onClick={() => setHidden((h) => !h)}>
            {hidden ? "Показати текст" : "Сховати слова"}
          </button>
        </div>
      )}

      <div className="space-y-2">
        <textarea
          className="w-full border rounded p-2 h-32"
          placeholder="Введіть вірш по пам'яті…"
          value={typed}
          onChange={(e) => { setTyped(e.target.value); setChecked(false); }}
        />
        <div className="flex gap-2">
          <button className="bg-black text-white rounded px-4 py-2" onClick={check}>Перевірити</button>
          <button className="border rounded px-4 py-2" onClick={toggleMastered}>
            {isMastered ? "✓ Запам'ятано" : "Позначити запам'ятаним"}
          </button>
        </div>
        {checked && current && (
          <div className={ok ? "text-green-600 font-semibold" : "text-red-600"}>
            {ok ? "Правильно! 🎉" : "Не зовсім. Оригінал:"}
            {!ok && <div className="text-sm text-gray-700 mt-1">{current.text}</div>}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">Запам'ятано віршів: {mastered.size}</div>
    </main>
  );
}