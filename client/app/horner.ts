// Grant Horner's Bible Reading Plan — pure calculation logic.
//
// The plan consists of 10 independent lists. Each day you read one chapter
// from each list, starting at the head of every list on Day 1 and wrapping
// each list independently when you reach its end.
//
// Lists (standard version as taught by Prof. Grant Horner and published via
// Ligonier / SoHmer / Bible.com plan 1848):
//   1. Gospels:                  Matthew, Mark, Luke, John                       (89 ch)
//   2. Pentateuch:               Genesis–Deuteronomy                             (187 ch)
//   3. Pauline epistles:         Romans, 1–2 Cor, Gal, Eph, Phil, Col, Hebrews  (78 ch)
//   4. Pastoral/general + Rev:   1–2 Thess, 1–2 Tim, Titus, Philemon, James,
//                                1–2 Peter, 1–3 John, Jude, Revelation           (65 ch)
//   5. Wisdom:                   Job, Ecclesiastes, Song of Songs                (62 ch)
//   6. Psalms:                   Psalms                                          (150 ch)
//   7. Proverbs:                 Proverbs                                        (31 ch)
//   8. History:                  Joshua, Judges, Ruth, 1–2 Samuel, 1–2 Kings,
//                                1–2 Chronicles, Ezra, Nehemiah, Esther          (249 ch)
//   9. Prophets:                 Isaiah–Malachi (all 17 prophetic books)         (250 ch)
//  10. Acts:                     Acts                                            (28 ch)

export interface BookSpec {
  code: string;
  name: string;
  chapters: number;
}

export interface ListSpec {
  id: number;
  title: string;
  books: BookSpec[];
}

export interface DayReading {
  listId: number;
  listTitle: string;
  bookCode: string;
  bookName: string;
  chapter: number;
  /** 1-based position inside the flattened list, e.g. 45 */
  positionInList: number;
  /** total chapters in the flattened list, e.g. 150 */
  listLength: number;
}

const B = (code: string, name: string, chapters: number): BookSpec => ({
  code,
  name,
  chapters,
});

export const LISTS: ListSpec[] = [
  {
    id: 1,
    title: "Gospels",
    books: [
      B("MAT", "Matthew", 28),
      B("MRK", "Mark", 16),
      B("LUK", "Luke", 24),
      B("JHN", "John", 21),
    ],
  },
  {
    id: 2,
    title: "Pentateuch",
    books: [
      B("GEN", "Genesis", 50),
      B("EXO", "Exodus", 40),
      B("LEV", "Leviticus", 27),
      B("NUM", "Numbers", 36),
      B("DEU", "Deuteronomy", 34),
    ],
  },
  {
    id: 3,
    title: "Pauline Epistles",
    books: [
      B("ROM", "Romans", 16),
      B("1CO", "1 Corinthians", 16),
      B("2CO", "2 Corinthians", 13),
      B("GAL", "Galatians", 6),
      B("EPH", "Ephesians", 6),
      B("PHP", "Philippians", 4),
      B("COL", "Colossians", 4),
      B("HEB", "Hebrews", 13),
    ],
  },
  {
    id: 4,
    title: "General Epistles & Revelation",
    books: [
      B("1TH", "1 Thessalonians", 5),
      B("2TH", "2 Thessalonians", 3),
      B("1TI", "1 Timothy", 6),
      B("2TI", "2 Timothy", 4),
      B("TIT", "Titus", 3),
      B("PHM", "Philemon", 1),
      B("JAS", "James", 5),
      B("1PE", "1 Peter", 5),
      B("2PE", "2 Peter", 3),
      B("1JN", "1 John", 5),
      B("2JN", "2 John", 1),
      B("3JN", "3 John", 1),
      B("JUD", "Jude", 1),
      B("REV", "Revelation", 22),
    ],
  },
  {
    id: 5,
    title: "Wisdom",
    books: [
      B("JOB", "Job", 42),
      B("ECC", "Ecclesiastes", 12),
      B("SNG", "Song of Songs", 8),
    ],
  },
  { id: 6, title: "Psalms", books: [B("PSA", "Psalms", 150)] },
  { id: 7, title: "Proverbs", books: [B("PRO", "Proverbs", 31)] },
  {
    id: 8,
    title: "History",
    books: [
      B("JOS", "Joshua", 24),
      B("JDG", "Judges", 21),
      B("RUT", "Ruth", 4),
      B("1SA", "1 Samuel", 31),
      B("2SA", "2 Samuel", 24),
      B("1KI", "1 Kings", 22),
      B("2KI", "2 Kings", 25),
      B("1CH", "1 Chronicles", 29),
      B("2CH", "2 Chronicles", 36),
      B("EZR", "Ezra", 10),
      B("NEH", "Nehemiah", 13),
      B("EST", "Esther", 10),
    ],
  },
  {
    id: 9,
    title: "Prophets",
    books: [
      B("ISA", "Isaiah", 66),
      B("JER", "Jeremiah", 52),
      B("LAM", "Lamentations", 5),
      B("EZK", "Ezekiel", 48),
      B("DAN", "Daniel", 12),
      B("HOS", "Hosea", 14),
      B("JOL", "Joel", 3),
      B("AMO", "Amos", 9),
      B("OBA", "Obadiah", 1),
      B("JON", "Jonah", 4),
      B("MIC", "Micah", 7),
      B("NAM", "Nahum", 3),
      B("HAB", "Habakkuk", 3),
      B("ZEP", "Zephaniah", 3),
      B("HAG", "Haggai", 2),
      B("ZEC", "Zechariah", 14),
      B("MAL", "Malachi", 4),
    ],
  },
  { id: 10, title: "Acts", books: [B("ACT", "Acts", 28)] },
];

export function listLength(list: ListSpec): number {
  return list.books.reduce((sum, b) => sum + b.chapters, 0);
}

export const LIST_LENGTHS: number[] = LISTS.map(listLength);

/** Resolve the flat position (0-based) inside a list to Book + chapter. */
export function resolvePosition(
  list: ListSpec,
  zeroBasedIndex: number,
): { book: BookSpec; chapter: number } {
  let idx = ((zeroBasedIndex % listLength(list)) + listLength(list)) % listLength(list);
  for (const book of list.books) {
    if (idx < book.chapters) {
      return { book, chapter: idx + 1 };
    }
    idx -= book.chapters;
  }
  // Unreachable, but satisfy TS.
  const last = list.books[list.books.length - 1];
  return { book: last, chapter: last.chapters };
}

/**
 * Calculate the 10 readings for a given plan day.
 * Day 1 = first chapter of every list. Each list wraps independently.
 * Non-integer / <1 values are clamped to day 1.
 */
export function getReadingsForDay(day: number): DayReading[] {
  const safeDay = Math.max(1, Math.floor(day) || 1);
  return LISTS.map((list) => {
    const len = listLength(list);
    const pos0 = (safeDay - 1) % len; // 0-based position in list
    const { book, chapter } = resolvePosition(list, pos0);
    return {
      listId: list.id,
      listTitle: list.title,
      bookCode: book.code,
      bookName: book.name,
      chapter,
      positionInList: pos0 + 1,
      listLength: len,
    };
  });
}

/** Whole days between two dates ignoring time-of-day/DST. */
export function daysBetween(start: Date, end: Date): number {
  const s = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const e = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((e - s) / 86_400_000);
}

/** Plan day number for `target` given the plan started on `start` (Day 1 = start). */
export function dayNumberForDates(start: Date, target: Date): number {
  return daysBetween(start, target) + 1;
}

export function formatReading(r: DayReading): string {
  return `${r.bookName} ${r.chapter}`;
}
