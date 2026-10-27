"use client";

import { useEffect, useMemo, useState } from "react";

type Book = { code: string; name: string; chapters: number };
type Verse = { id: string; number: number; text: string };
type Reference = { id: string; label: string; text: string; votes: number };

const initialBook = "GEN";

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState(initialBook);
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [openReferenceList, setOpenReferenceList] = useState<string | null>(null);
  const [references, setReferences] = useState<Reference[]>([]);
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
  const [isLoadingChapter, setIsLoadingChapter] = useState(true);
  const [isLoadingReferences, setIsLoadingReferences] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedBook = useMemo(() => books.find((item) => item.code === book), [books, book]);

  async function loadChapter(nextBook: string, nextChapter: number) {
    setIsLoadingChapter(true);
    setError(null);
    setOpenReferenceList(null);
    setReferences([]);
    setSelectedReference(null);

    try {
      const response = await fetch(`/api/bible?book=${nextBook}&chapter=${nextChapter}`);
      if (!response.ok) throw new Error("Unable to load this chapter.");
      const data = await response.json();
      setBooks(data.books);
      setBook(data.book);
      setChapter(data.chapter);
      setVerses(data.verses);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load this chapter.");
    } finally {
      setIsLoadingChapter(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/bible?book=${initialBook}&chapter=1`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load this chapter.");
        return response.json();
      })
      .then((data) => {
        setBooks(data.books);
        setBook(data.book);
        setChapter(data.chapter);
        setVerses(data.verses);
      })
      .catch((reason) => {
        if (reason.name !== "AbortError") {
          setError(reason instanceof Error ? reason.message : "Unable to load this chapter.");
        }
      })
      .finally(() => setIsLoadingChapter(false));

    return () => controller.abort();
  }, []);

  async function toggleReferences(verseId: string) {
    if (openReferenceList === verseId) {
      setOpenReferenceList(null);
      setReferences([]);
      setSelectedReference(null);
      return;
    }

    setOpenReferenceList(verseId);
    setReferences([]);
    setSelectedReference(null);
    setIsLoadingReferences(true);
    try {
      const response = await fetch(`/api/bible?verse=${encodeURIComponent(verseId)}`);
      if (!response.ok) throw new Error("Unable to load cross-references.");
      const data = await response.json();
      setReferences(data.references);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load cross-references.");
    } finally {
      setIsLoadingReferences(false);
    }
  }

  function moveChapter(direction: "previous" | "next") {
    if (!selectedBook) return;

    const bookIndex = books.findIndex((item) => item.code === book);
    if (direction === "previous") {
      if (chapter > 1) return void loadChapter(book, chapter - 1);
      const previousBook = books[bookIndex - 1];
      if (previousBook) void loadChapter(previousBook.code, previousBook.chapters);
      return;
    }

    if (chapter < selectedBook.chapters) return void loadChapter(book, chapter + 1);
    const nextBook = books[bookIndex + 1];
    if (nextBook) void loadChapter(nextBook.code, 1);
  }

  const isFirstChapter = book === books[0]?.code && chapter === 1;
  const isLastChapter = book === books.at(-1)?.code && chapter === selectedBook?.chapters;

  return (
    <main className="reader-shell">
      <section className="reader" aria-label="Bible reader">
        <h1 className="passage-title">
          <select aria-label="Book" value={book} onChange={(event) => void loadChapter(event.target.value, 1)} disabled={isLoadingChapter}>
            {books.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
          </select>
          <span>{chapter}</span>
        </h1>

        {error && <p className="error-message" role="alert">{error}</p>}
        {isLoadingChapter ? <p className="loading-message">Opening the passage…</p> : (
          <article className="passage" aria-live="polite">
            {verses.map((verse) => {
              const isOpen = openReferenceList === verse.id;
              const visibleReference = isOpen ? selectedReference : null;
              return (
                <section className="verse-group" key={verse.id}>
                  <p className="verse"><sup>{verse.number}</sup>{verse.text}</p>
                  <button className="reference-toggle" onClick={() => void toggleReferences(verse.id)} aria-expanded={isOpen}>
                    References <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="reference-panel" aria-label={`Cross-references for verse ${verse.number}`}>
                      {isLoadingReferences ? <p className="reference-status">Loading references…</p> : references.length ? (
                        <>
                          <div className="reference-list">
                            {references.map((reference) => (
                              <button
                                className={`reference-link ${visibleReference?.id === reference.id ? "reference-link-active" : ""}`}
                                key={reference.id}
                                onClick={() => setSelectedReference(reference)}
                              >
                                {reference.label}
                              </button>
                            ))}
                          </div>
                          {visibleReference && <p className="selected-reference"><strong>{visibleReference.label}</strong>{visibleReference.text}</p>}
                        </>
                      ) : <p className="reference-status">No references are recorded for this verse.</p>}
                    </div>
                  )}
                </section>
              );
            })}
          </article>
        )}
      </section>

      <nav className="chapter-navigator" aria-label="Chapter navigation">
        <button onClick={() => moveChapter("previous")} disabled={isLoadingChapter || isFirstChapter}>← Previous</button>
        <label>
          <span className="sr-only">Chapter</span>
          <select value={chapter} onChange={(event) => void loadChapter(book, Number(event.target.value))} disabled={isLoadingChapter || !selectedBook}>
            {Array.from({ length: selectedBook?.chapters ?? 1 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>Chapter {number}</option>)}
          </select>
        </label>
        <button onClick={() => moveChapter("next")} disabled={isLoadingChapter || isLastChapter}>Next →</button>
      </nav>
    </main>
  );
}
