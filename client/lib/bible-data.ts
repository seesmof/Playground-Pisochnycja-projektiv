import { readFile } from "node:fs/promises";
import path from "node:path";

export type Verse = {
  id: string;
  book: string;
  chapter: number;
  number: number;
  text: string;
};

export type Reference = {
  id: string;
  label: string;
  text: string;
  votes: number;
};

export type BookSummary = {
  code: string;
  name: string;
  chapters: number;
};

type BibleIndex = {
  books: BookSummary[];
  chapters: Map<string, Map<number, Verse[]>>;
  verses: Map<string, Verse>;
  references: Map<string, Array<{ target: string; votes: number }>>;
};

const bookNames: Record<string, string> = {
  GEN: "Genesis", EXO: "Exodus", LEV: "Leviticus", NUM: "Numbers", DEU: "Deuteronomy",
  JOS: "Joshua", JDG: "Judges", RUT: "Ruth", "1SA": "1 Samuel", "2SA": "2 Samuel",
  "1KI": "1 Kings", "2KI": "2 Kings", "1CH": "1 Chronicles", "2CH": "2 Chronicles",
  EZR: "Ezra", NEH: "Nehemiah", EST: "Esther", JOB: "Job", PSA: "Psalms", PRO: "Proverbs",
  ECC: "Ecclesiastes", SNG: "Song of Songs", ISA: "Isaiah", JER: "Jeremiah", LAM: "Lamentations",
  EZK: "Ezekiel", DAN: "Daniel", HOS: "Hosea", JOL: "Joel", AMO: "Amos", OBA: "Obadiah",
  JON: "Jonah", MIC: "Micah", NAM: "Nahum", HAB: "Habakkuk", ZEP: "Zephaniah", HAG: "Haggai",
  ZEC: "Zechariah", MAL: "Malachi", MAT: "Matthew", MRK: "Mark", LUK: "Luke", JHN: "John",
  ACT: "Acts", ROM: "Romans", "1CO": "1 Corinthians", "2CO": "2 Corinthians", GAL: "Galatians",
  EPH: "Ephesians", PHP: "Philippians", COL: "Colossians", "1TH": "1 Thessalonians", "2TH": "2 Thessalonians",
  "1TI": "1 Timothy", "2TI": "2 Timothy", TIT: "Titus", PHM: "Philemon", HEB: "Hebrews",
  JAS: "James", "1PE": "1 Peter", "2PE": "2 Peter", "1JN": "1 John", "2JN": "2 John",
  "3JN": "3 John", JUD: "Jude", REV: "Revelation",
};

const aliases: Record<string, string> = {
  gen: "GEN", exod: "EXO", lev: "LEV", num: "NUM", deut: "DEU", josh: "JOS", judg: "JDG",
  ruth: "RUT", "1sam": "1SA", "2sam": "2SA", "1kgs": "1KI", "2kgs": "2KI", "1chr": "1CH",
  "2chr": "2CH", ezra: "EZR", neh: "NEH", esth: "EST", job: "JOB", ps: "PSA", prov: "PRO",
  eccl: "ECC", song: "SNG", isa: "ISA", jer: "JER", lam: "LAM", ezek: "EZK", dan: "DAN",
  hos: "HOS", joel: "JOL", amos: "AMO", obad: "OBA", jonah: "JON", mic: "MIC", nah: "NAM",
  hab: "HAB", zeph: "ZEP", hag: "HAG", zech: "ZEC", mal: "MAL", matt: "MAT", mark: "MRK",
  luke: "LUK", john: "JHN", acts: "ACT", rom: "ROM", "1cor": "1CO", "2cor": "2CO", gal: "GAL",
  eph: "EPH", phil: "PHP", col: "COL", "1thess": "1TH", "2thess": "2TH", "1tim": "1TI",
  "2tim": "2TI", titus: "TIT", phlm: "PHM", heb: "HEB", jas: "JAS", "1pet": "1PE", "2pet": "2PE",
  "1john": "1JN", "2john": "2JN", "3john": "3JN", jude: "JUD", rev: "REV",
};

let indexPromise: Promise<BibleIndex> | undefined;

function dataPath(filename: string) {
  return path.join(process.cwd(), "..", filename);
}

function parseReferenceId(reference: string) {
  const match = reference.trim().match(/^(.+?)\.(\d+)\.(\d+)$/);
  if (!match) return undefined;

  const book = aliases[match[1].replaceAll(" ", "").toLowerCase()] ?? match[1].toUpperCase();
  return `${book}.${Number(match[2])}.${Number(match[3])}`;
}

function formatReference(verse: Verse) {
  return `${bookNames[verse.book] ?? verse.book} ${verse.chapter}:${verse.number}`;
}

async function createIndex(): Promise<BibleIndex> {
  const [bibleText, referencesText] = await Promise.all([
    readFile(dataPath("Bible.txt"), "utf8"),
    readFile(dataPath("references.csv"), "utf8"),
  ]);

  const chapters = new Map<string, Map<number, Verse[]>>();
  const verses = new Map<string, Verse>();

  for (const line of bibleText.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9]{3})\s+(\d+):(\d+)\s+(.+)$/);
    if (!match) continue;

    const [, book, chapterText, numberText, text] = match;
    const chapter = Number(chapterText);
    const number = Number(numberText);
    const verse = { id: `${book}.${chapter}.${number}`, book, chapter, number, text };
    const bookChapters = chapters.get(book) ?? new Map<number, Verse[]>();
    const chapterVerses = bookChapters.get(chapter) ?? [];

    chapterVerses.push(verse);
    bookChapters.set(chapter, chapterVerses);
    chapters.set(book, bookChapters);
    verses.set(verse.id, verse);
  }

  const references = new Map<string, Array<{ target: string; votes: number }>>();
  for (const line of referencesText.split(/\r?\n/).slice(1)) {
    const [from, to, votesText] = line.split(",");
    if (!from || !to) continue;

    const source = parseReferenceId(from);
    const target = parseReferenceId(to);
    if (!source || !target) continue;

    const entries = references.get(source) ?? [];
    entries.push({ target, votes: Number(votesText) || 0 });
    references.set(source, entries);
  }

  const books = [...chapters.entries()].map(([code, bookChapters]) => ({
    code,
    name: bookNames[code] ?? code,
    chapters: Math.max(...bookChapters.keys()),
  }));

  return { books, chapters, verses, references };
}

async function getIndex() {
  indexPromise ??= createIndex();
  return indexPromise;
}

export async function getBibleCatalog() {
  return (await getIndex()).books;
}

export async function getChapter(book: string, chapter: number) {
  const index = await getIndex();
  return index.chapters.get(book)?.get(chapter) ?? [];
}

export async function getCrossReferences(verseId: string): Promise<Reference[]> {
  const index = await getIndex();
  return (index.references.get(verseId) ?? [])
    .map(({ target, votes }) => {
      const verse = index.verses.get(target);
      return verse && { id: target, label: formatReference(verse), text: verse.text, votes };
    })
    .filter((reference): reference is Reference => Boolean(reference))
    .sort((left, right) => right.votes - left.votes)
    .slice(0, 8);
}
