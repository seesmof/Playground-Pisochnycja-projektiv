import { IVerse } from "@/app/page";

export default function Verse({ verseNumber, verseContent }: IVerse) {
  return (
    <p
      className="cursor-pointer hover:underline underline-offset-4"
      onClick={() => navigator.clipboard.writeText(verseContent)}
    >
      <small>{verseNumber}</small> {verseContent}
    </p>
  );
}
