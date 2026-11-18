"use client";

import { useEffect, useState } from "react";

export interface BookMeta {
  name: string;
  chapters: number[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  books: BookMeta[];
  onSelectChapter: (book: string, chapter: number) => void;
}

export default function BookNavigator({
  open,
  onClose,
  books,
  onSelectChapter,
}: Props) {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  // Reset to book list each time it opens
  useEffect(() => {
    if (open) setSelectedBook(null);
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const book = selectedBook ? books.find((b) => b.name === selectedBook) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          {book ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedBook(null)}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Books
              </button>
              <span className="font-semibold">{book.name}</span>
            </div>
          ) : (
            <span className="font-semibold">Books</span>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 px-2"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          {book ? (
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {book.chapters.map((ch) => (
                <button
                  key={ch}
                  onClick={() => {
                    onSelectChapter(book.name, ch);
                    onClose();
                  }}
                  className="aspect-square rounded-lg border text-sm font-medium hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  {ch}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {books.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setSelectedBook(b.name)}
                  className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
