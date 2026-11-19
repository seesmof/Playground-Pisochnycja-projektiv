// lib/parseBible.ts
export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export function parseBible(rawText: string): Verse[] {
  const lines = rawText.split("\n").filter((line) => line.trim() !== "");
  const verses: Verse[] = [];

  // Regex: matches "GEN 1:1 " at the start of a line
  const regex = /^(\w+)\s+(\d+):(\d+)\s+(.*)$/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      verses.push({
        book: match[1],
        chapter: parseInt(match[2], 10),
        verse: parseInt(match[3], 10),
        text: match[4].trim(),
      });
    }
  }
  return verses;
}
