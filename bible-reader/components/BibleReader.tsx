"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { parseBible, Verse } from "@/lib/parseBible";
import BookNavigator, { BookMeta } from "./BookNavigator";

const CHAPTERS_PER_PAGE = 3;

interface ChapterRef {
  book: string;
  chapter: number;
}
const chapterKey = (book: string, chapter: number) => `${book}:${chapter}`;

export default function BibleReader() {
  const [allVerses, setAllVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(CHAPTERS_PER_PAGE);

  const [jumpToken, setJumpToken] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // Ordered, unique {book, chapter} list
  const chapters = useMemo<ChapterRef[]>(() => {
    const seen = new Set<string>();
    const list: ChapterRef[] = [];
    for (const v of allVerses) {
      const key = chapterKey(v.book, v.chapter);
      if (!seen.has(key)) {
        seen.add(key);
        list.push({ book: v.book, chapter: v.chapter });
      }
    }
    return list;
  }, [allVerses]);

  // Books -> chapters, in order
  const booksMeta = useMemo<BookMeta[]>(() => {
    const map = new Map<string, number[]>();
    for (const c of chapters) {
      if (!map.has(c.book)) map.set(c.book, []);
      map.get(c.book)!.push(c.chapter);
    }
    return Array.from(map, ([name, chs]) => ({ name, chapters: chs }));
  }, [chapters]);

  // Fetch + parse once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/bible.txt");
      const text = await res.text();
      if (cancelled) return;
      setAllVerses(parseBible(text));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Clamp endIndex if the Bible has fewer chapters than the page size
  useEffect(() => {
    if (chapters.length > 0)
      setEndIndex((prev) => Math.min(prev, chapters.length));
  }, [chapters.length]);

  const displayedChapterKeys = useMemo(() => {
    const set = new Set<string>();
    const end = Math.min(endIndex, chapters.length);
    for (let i = startIndex; i < end; i++) {
      set.add(chapterKey(chapters[i].book, chapters[i].chapter));
    }
    return set;
  }, [chapters, startIndex, endIndex]);

  const displayedVerses = useMemo(
    () =>
      allVerses.filter((v) =>
        displayedChapterKeys.has(chapterKey(v.book, v.chapter)),
      ),
    [allVerses, displayedChapterKeys],
  );

  const groups = useMemo(() => {
    const map = new Map<
      string,
      { book: string; chapter: number; verses: Verse[] }
    >();
    for (const v of displayedVerses) {
      const key = chapterKey(v.book, v.chapter);
      let g = map.get(key);
      if (!g) {
        g = { book: v.book, chapter: v.chapter, verses: [] };
        map.set(key, g);
      }
      g.verses.push(v);
    }
    return Array.from(map.values());
  }, [displayedVerses]);

  // ---------- Scroll management ----------
  const pendingAdjust = useRef<{
    scrollTop: number;
    scrollHeight: number;
  } | null>(null);
  const scrollToTopRef = useRef(false);

  // Preserve position after prepending
  useLayoutEffect(() => {
    if (!pendingAdjust.current) return;
    const { scrollTop, scrollHeight } = pendingAdjust.current;
    const delta = document.documentElement.scrollHeight - scrollHeight;
    document.documentElement.scrollTop = scrollTop + delta;
    pendingAdjust.current = null;
  }, [startIndex]);

  // Scroll to top after a jump
  useLayoutEffect(() => {
    if (!scrollToTopRef.current) return;
    window.scrollTo(0, 0);
    scrollToTopRef.current = false;
  }, [jumpToken]);

  const loadMoreDown = useCallback(() => {
    setEndIndex((prev) => Math.min(prev + CHAPTERS_PER_PAGE, chapters.length));
  }, [chapters.length]);

  const loadMoreUp = useCallback(() => {
    if (startIndex <= 0) return;
    pendingAdjust.current = {
      scrollTop: document.documentElement.scrollTop,
      scrollHeight: document.documentElement.scrollHeight,
    };
    setStartIndex((prev) => Math.max(prev - CHAPTERS_PER_PAGE, 0));
  }, [startIndex]);

  // Jump to a specific chapter (called by navigator)
  const jumpToChapter = useCallback(
    (book: string, chapter: number) => {
      const idx = chapters.findIndex(
        (c) => c.book === book && c.chapter === chapter,
      );
      if (idx === -1) return;

      pendingAdjust.current = null; // don't adjust scroll — we're jumping
      scrollToTopRef.current = true; // scroll to top after render

      setStartIndex(idx);
      setEndIndex(Math.min(idx + CHAPTERS_PER_PAGE, chapters.length));
      setJumpToken((t) => t + 1); // force the scroll-to-top effect to run
    },
    [chapters],
  );

  // Intersection observers
  useEffect(() => {
    if (loading || chapters.length === 0) return;
    const opts: IntersectionObserverInit = { rootMargin: "200px" };

    const bottom = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && endIndex < chapters.length)
        loadMoreDown();
    }, opts);
    if (bottomSentinelRef.current) bottom.observe(bottomSentinelRef.current);

    const top = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && startIndex > 0) loadMoreUp();
    }, opts);
    if (topSentinelRef.current) top.observe(topSentinelRef.current);

    return () => {
      bottom.disconnect();
      top.disconnect();
    };
  }, [
    loading,
    chapters.length,
    startIndex,
    endIndex,
    loadMoreDown,
    loadMoreUp,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Bible…
      </div>
    );
  }

  return (
    <>
      {/* Sticky top bar with Books button */}
      <header
        className="sticky top-0 z-40 h-14 flex items-center justify-between px-4
                         bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b"
      >
        <h1 className="font-bold text-lg">Bible Reader</h1>
        <button
          onClick={() => setNavOpen(true)}
          className="px-3 py-1.5 rounded-lg border text-sm font-medium
                     hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Books
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div ref={topSentinelRef} className="h-4" aria-hidden="true" />
        {startIndex > 0 && (
          <div className="text-center text-sm text-gray-400 mb-4">
            Scroll up for previous chapters
          </div>
        )}

        {groups.map((g) => (
          <section key={chapterKey(g.book, g.chapter)} className="mb-12">
            {/* Offset sticky header so it sits just below the top bar */}
            <h2
              className="text-2xl font-bold mb-4 sticky top-14 z-10
                           bg-white dark:bg-gray-900 py-2"
            >
              {g.book} {g.chapter}
            </h2>
            <div className="space-y-3">
              {g.verses.map((v) => (
                <p
                  key={`${v.book}-${v.chapter}-${v.verse}`}
                  className="text-lg leading-relaxed"
                >
                  <span className="font-semibold text-gray-500 mr-2">
                    {v.verse}
                  </span>
                  {v.text}
                </p>
              ))}
            </div>
          </section>
        ))}

        {endIndex < chapters.length && (
          <div className="text-center text-sm text-gray-400 mt-4">
            Scroll down for next chapters
          </div>
        )}
        <div ref={bottomSentinelRef} className="h-4" aria-hidden="true" />
      </div>

      <BookNavigator
        open={navOpen}
        onClose={() => setNavOpen(false)}
        books={booksMeta}
        onSelectChapter={jumpToChapter}
      />
    </>
  );
}
