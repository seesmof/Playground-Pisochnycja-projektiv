import { NextRequest } from "next/server";
import { getBibleCatalog, getChapter, getCrossReferences } from "@/lib/bible-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const verseId = searchParams.get("verse");

  if (verseId) {
    return Response.json({ references: await getCrossReferences(verseId) });
  }

  const book = searchParams.get("book") ?? "GEN";
  const chapter = Number(searchParams.get("chapter") ?? "1");
  const [books, verses] = await Promise.all([getBibleCatalog(), getChapter(book, chapter)]);

  return Response.json({ books, book, chapter, verses });
}
