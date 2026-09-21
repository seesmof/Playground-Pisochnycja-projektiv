"use strict";
/* Bible reader — parses Bible.txt lines of form: CODE CHAPTER:VERSE text (UTF-8) */

const BOOKS = [
  ["GEN","Буття","ot"],["EXO","Вихід","ot"],["LEV","Левит","ot"],["NUM","Числа","ot"],
  ["DEU","Второзаконня","ot"],["JOS","Ісус Навин","ot"],["JDG","Судді","ot"],["RUT","Рут","ot"],
  ["1SA","1 Самуїла","ot"],["2SA","2 Самуїла","ot"],["1KI","1 Царів","ot"],["2KI","2 Царів","ot"],
  ["1CH","1 Хронік","ot"],["2CH","2 Хронік","ot"],["EZR","Езра","ot"],["NEH","Неемія","ot"],
  ["EST","Естер","ot"],["JOB","Йов","ot"],["PSA","Псалми","ot"],["PRO","Приповісті","ot"],
  ["ECC","Екклезіяст","ot"],["SNG","Пісня над піснями","ot"],["ISA","Ісая","ot"],["JER","Єремія","ot"],
  ["LAM","Плач Єремії","ot"],["EZK","Єзекіїль","ot"],["DAN","Даниїл","ot"],["HOS","Осія","ot"],
  ["JOL","Йоїл","ot"],["AMO","Амос","ot"],["OBA","Овдій","ot"],["JON","Йона","ot"],
  ["MIC","Михей","ot"],["NAM","Наум","ot"],["HAB","Авакум","ot"],["ZEP","Софонія","ot"],
  ["HAG","Огій","ot"],["ZEC","Захарія","ot"],["MAL","Малахія","ot"],
  ["MAT","Матвія","nt"],["MRK","Марка","nt"],["LUK","Луки","nt"],["JHN","Івана","nt"],
  ["ACT","Дії","nt"],["ROM","Римлян","nt"],["1CO","1 Коринтян","nt"],["2CO","2 Коринтян","nt"],
  ["GAL","Галатів","nt"],["EPH","Ефесян","nt"],["PHP","Филипʼян","nt"],["COL","Колосян","nt"],
  ["1TH","1 Солунян","nt"],["2TH","2 Солунян","nt"],["1TI","1 Тимофія","nt"],["2TI","2 Тимофія","nt"],
  ["TIT","Тита","nt"],["PHM","Филимона","nt"],["HEB","Євреїв","nt"],["JAS","Якова","nt"],
  ["1PE","1 Петра","nt"],["2PE","2 Петра","nt"],["1JN","1 Івана","nt"],["2JN","2 Івана","nt"],
  ["3JN","3 Івана","nt"],["JUD","Юди","nt"],["REV","Обʼявлення","nt"],
];
const NAME_BY_CODE = Object.fromEntries(BOOKS.map(b => [b[0], b[1]]));
const ORDER = BOOKS.map(b => b[0]);

// code -> { chapter -> [{v, t}] }
const bible = {};
let totalVerses = 0;
let state = { book: "GEN", chapter: 1, filter: "all" };

const $ = id => document.getElementById(id);
const bookListEl = $("bookList"), readerEl = $("reader"), refTitleEl = $("refTitle"),
  chapterGridEl = $("chapterGrid"), statusEl = $("status"), navBarEl = $("navBar"),
  searchResultsEl = $("searchResults"), statsLineEl = $("statsLine");

function parseBibleText(text) {
  const re = /^(\S+)\s+(\d+):(\d+)\s+([\s\S]*)$/;
  let count = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const m = re.exec(line);
    if (!m) continue; // skip malformed
    const [, code, chS, vS, t] = m;
    const ch = +chS, v = +vS;
    (bible[code] ??= {})[ch] ??= [];
    bible[code][ch].push({ v, t });
    count++;
  }
  // sort verses numerically (file already sorted, but be safe)
  for (const code of Object.keys(bible))
    for (const ch of Object.keys(bible[code]))
      bible[code][ch].sort((a, b) => a.v - b.v);
  totalVerses = count;
  return count;
}

function refName(code) { return NAME_BY_CODE[code] || code; }

function renderBookList() {
  bookListEl.innerHTML = "";
  for (const [code, name, test] of BOOKS) {
    if (state.filter !== "all" && test !== state.filter) continue;
    const nCh = bible[code] ? Object.keys(bible[code]).length : 0;
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.innerHTML = "";
    const s1 = document.createElement("span"); s1.textContent = name;
    const s2 = document.createElement("span"); s2.className = "count"; s2.textContent = nCh ? `${nCh} розд.` : "—";
    b.append(s1, s2);
    if (code === state.book) b.classList.add("active");
    b.onclick = () => selectBook(code);
    li.appendChild(b);
    bookListEl.appendChild(li);
  }
}

function selectBook(code, chapter) {
  if (!bible[code]) return;
  state.book = code;
  const chapters = Object.keys(bible[code]).map(Number).sort((a, b) => a - b);
  state.chapter = chapter && bible[code][chapter] ? chapter : chapters[0];
  savePos();
  renderAll();
}

function renderAll() {
  renderBookList();
  renderChapterGrid();
  renderChapter();
  updateHash();
}

function renderChapterGrid() {
  const chs = Object.keys(bible[state.book] || {}).map(Number).sort((a, b) => a - b);
  chapterGridEl.classList.remove("hidden");
  chapterGridEl.innerHTML = "";
  for (const ch of chs) {
    const b = document.createElement("button");
    b.textContent = ch;
    if (ch === state.chapter) b.classList.add("active");
    b.onclick = () => { state.chapter = ch; savePos(); renderAll(); window.scrollTo(0, 0); };
    chapterGridEl.appendChild(b);
  }
}

function renderChapter(highlightVerse) {
  navBarEl.classList.remove("hidden");
  searchResultsEl.classList.add("hidden");
  searchResultsEl.innerHTML = "";
  refTitleEl.textContent = `${refName(state.book)} ${state.chapter}`;
  readerEl.innerHTML = "";
  const verses = (bible[state.book] && bible[state.book][state.chapter]) || [];
  for (const { v, t } of verses) {
    const p = document.createElement("p");
    p.className = "verse";
    p.id = `v${v}`;
    const n = document.createElement("span");
    n.className = "n"; n.textContent = v; n.title = "Копіювати вірш";
    n.onclick = () => {
      const ref = `${refName(state.book)} ${state.chapter}:${v} — ${t}`;
      navigator.clipboard?.writeText(ref);
      n.textContent = "✓";
      setTimeout(() => (n.textContent = v), 900);
    };
    const s = document.createElement("span");
    s.textContent = t;
    p.append(n, s);
    readerEl.appendChild(p);
  }
  statsLineEl.textContent = `${Object.keys(bible).length} книг · ${totalVerses.toLocaleString("uk-UA")} віршів · ${refName(state.book)} ${state.chapter} (${verses.length} віршів)`;
  if (highlightVerse) {
    const el = document.getElementById("v" + highlightVerse);
    if (el) { el.classList.add("flash"); el.scrollIntoView({ block: "center" }); }
  }
}

function stepChapter(dir) {
  const chs = Object.keys(bible[state.book]).map(Number).sort((a, b) => a - b);
  const i = chs.indexOf(state.chapter);
  if (i + dir >= 0 && i + dir < chs.length) {
    state.chapter = chs[i + dir];
  } else {
    const bi = ORDER.indexOf(state.book);
    const nb = ORDER[bi + dir];
    if (!nb || !bible[nb]) return;
    state.book = nb;
    const nchs = Object.keys(bible[nb]).map(Number).sort((a, b) => a - b);
    state.chapter = dir > 0 ? nchs[0] : nchs[nchs.length - 1];
  }
  savePos(); renderAll(); window.scrollTo(0, 0);
  document.querySelector(".main").scrollTop = 0;
}

// --- search: supports "Буття 1:1" style refs + full-text ---
function doSearch(q) {
  q = q.trim();
  if (!q) { renderChapter(); return; }
  // reference lookup: e.g. "GEN 1:1", "Буття 1:1", "1 Івана 1:5", "Пс 23"
  const refHit = parseReference(q);
  if (refHit) {
    selectBook(refHit.book, refHit.chapter);
    if (refHit.verse) renderChapter(refHit.verse);
    statusEl.textContent = "";
    return;
  }
  const needle = q.toLocaleLowerCase("uk");
  const out = [];
  outer:
  for (const code of ORDER) {
    if (!bible[code]) continue;
    for (const ch of Object.keys(bible[code]).map(Number).sort((a, b) => a - b)) {
      for (const { v, t } of bible[code][ch]) {
        if (t.toLocaleLowerCase("uk").includes(needle)) {
          out.push({ code, ch, v, t });
          if (out.length >= 200) break outer;
        }
      }
    }
  }
  searchResultsEl.classList.remove("hidden");
  searchResultsEl.innerHTML = "";
  const h = document.createElement("h3");
  h.textContent = `Знайдено: ${out.length}${out.length >= 200 ? " (показано перші 200)" : ""} — «${q}»`;
  searchResultsEl.appendChild(h);
  if (!out.length) {
    const p = document.createElement("p"); p.textContent = "Нічого не знайдено."; searchResultsEl.appendChild(p);
  }
  for (const r of out) {
    const div = document.createElement("div");
    div.className = "hit";
    const ref = document.createElement("span");
    ref.className = "ref";
    ref.textContent = `${refName(r.code)} ${r.ch}:${r.v}`;
    const sp = document.createElement("span");
    sp.innerHTML = escapeHtml(r.t).replace(
      new RegExp("(" + escapeRegExp(q) + ")", "ig"), "<mark>$1</mark>");
    div.append(ref, sp);
    div.onclick = () => {
      state.book = r.code; state.chapter = r.ch; savePos();
      renderAll(); renderChapter(r.v);
    };
    searchResultsEl.appendChild(div);
  }
  statusEl.textContent = "";
}

function parseReference(q) {
  // normalize: allow "Буття 1:1", "буття 1 : 1", "GEN 1:1", "пс 23", "Псалми 23:1"
  const m = q.match(/^(.+?)\s+(\d+)(?:\s*[:.]\s*(\d+))?\s*$/);
  if (!m) return null;
  let [, bookPart, chS, vS] = m;
  bookPart = bookPart.trim().toLocaleLowerCase("uk");
  let code = null;
  // code match
  const up = bookPart.toUpperCase();
  if (bible[up]) code = up;
  // name match (exact, prefix, or common abbreviations)
  if (!code) {
    const norm = s => s.toLocaleLowerCase("uk").replace(/ʼ|'/g, "ʼ");
    for (const [c, name] of Object.entries(NAME_BY_CODE)) {
      if (norm(name) === norm(bookPart) || norm(name).startsWith(norm(bookPart)) || norm(bookPart).startsWith(norm(name)))
        { code = c; break; }
    }
  }
  if (!code) {
    const abbr = { "бт": "GEN", "вих": "EXO", "лев": "LEV", "чис": "NUM", "вт": "DEU", "пс": "PSA", "псал": "PSA",
      "пр": "PRO", "прип": "PRO", "мт": "MAT", "мат": "MAT", "мк": "MRK", "лк": "LUK", "ів": "JHN", "ін": "JHN",
      "ді": "ACT", "рим": "ROM", "об": "REV", "обʼяв": "REV", "бут": "GEN", "йов": "JOB", "іс": "ISA", "єр": "JER" };
    for (const [k, c] of Object.entries(abbr)) if (bookPart.startsWith(k)) { code = c; break; }
  }
  if (!code || !bible[code]) return null;
  const ch = +chS;
  if (!bible[code][ch]) return null;
  return { book: code, chapter: ch, verse: vS ? +vS : null };
}

function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function savePos() { try { localStorage.setItem("bible-pos", JSON.stringify({ b: state.book, c: state.chapter })); } catch {} }
function loadPos() {
  try {
    const p = JSON.parse(localStorage.getItem("bible-pos") || "null");
    if (p && bible[p.b] && bible[p.b][p.c]) { state.book = p.b; state.chapter = p.c; return; }
  } catch {}
  // hash #GEN.1.1
  const m = location.hash.match(/#([A-Z0-9]+)\.(\d+)(?:\.(\d+))?/i);
  if (m && bible[m[1].toUpperCase()] && bible[m[1].toUpperCase()][+m[2]]) {
    state.book = m[1].toUpperCase(); state.chapter = +m[2];
    setTimeout(() => m[3] && renderChapter(+m[3]), 0);
  }
}
function updateHash() { location.hash = `${state.book}.${state.chapter}`; }

// --- settings ---
function applyFont(d) {
  const reader = document.querySelector(".reader");
  const cur = +(localStorage.getItem("bible-font") || 18);
  const next = Math.min(26, Math.max(14, cur + d));
  reader.style.setProperty("--font-size", next + "px");
  try { localStorage.setItem("bible-font", next); } catch {}
}

// --- boot ---
async function boot() {
  // restore theme/font
  if (localStorage.getItem("bible-theme") === "dark") document.body.classList.add("dark");
  const f = +(localStorage.getItem("bible-font") || 0);
  if (f) document.querySelector(".reader").style.setProperty("--font-size", f + "px");

  let text = null;
  try {
    const res = await fetch("Bible.txt");
    if (!res.ok) throw new Error("HTTP " + res.status);
    text = await res.text();
  } catch (e) {
    $("loadFallback").classList.remove("hidden");
    statusEl.textContent = "Очікування вибору файлу…";
    $("filePicker").onchange = async ev => {
      const f = ev.target.files[0];
      if (!f) return;
      const t = await f.text();
      start(t);
    };
    return;
  }
  start(text);
}

function start(text) {
  $("loadFallback").classList.add("hidden");
  const n = parseBibleText(text);
  if (!n) { statusEl.textContent = "Не вдалося розпізнати Bible.txt (очікувався формат «GEN 1:1 текст»)."; return; }
  statusEl.textContent = "";
  loadPos();
  renderAll();
}

$("prevBtn").onclick = () => stepChapter(-1);
$("nextBtn").onclick = () => stepChapter(1);
$("searchBtn").onclick = () => doSearch($("searchInput").value);
$("searchInput").addEventListener("keydown", e => { if (e.key === "Enter") doSearch(e.target.value); });
$("randomBtn").onclick = () => {
  const codes = ORDER.filter(c => bible[c]);
  const code = codes[Math.floor(Math.random() * codes.length)];
  const chs = Object.keys(bible[code]).map(Number);
  const ch = chs[Math.floor(Math.random() * chs.length)];
  const vs = bible[code][ch];
  const v = vs[Math.floor(Math.random() * vs.length)].v;
  state.book = code; state.chapter = ch; savePos(); renderAll(); renderChapter(v);
};
$("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
  try { localStorage.setItem("bible-theme", document.body.classList.contains("dark") ? "dark" : "light"); } catch {}
};
$("fontInc").onclick = () => applyFont(1);
$("fontDec").onclick = () => applyFont(-1);
document.querySelectorAll(".sidebar-tabs button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".sidebar-tabs button").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  state.filter = b.dataset.testament;
  renderBookList();
});
document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== $("searchInput")) { e.preventDefault(); $("searchInput").focus(); }
  if (e.key === "ArrowRight" && document.activeElement.tagName !== "INPUT") stepChapter(1);
  if (e.key === "ArrowLeft" && document.activeElement.tagName !== "INPUT") stepChapter(-1);
});

boot();
