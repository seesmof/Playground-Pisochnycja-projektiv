import Link from "next/link";

export interface VerseType {
  text: string;
  reference: string;
}

export const Verse: React.FC<VerseType> = ({ text, reference }) => {
  const url = `https://www.biblegateway.com/passage/?search=${reference}&version=NASB,UKR`;
  return (
    <blockquote
      className="border-l-2 pl-4 border-sky-700 cursor-pointer"
      onClick={() => navigator.clipboard.writeText(text)}
    >
      {text}{" "}
      <cite>
        (
        <Link
          href={url}
          className="italic hover:underline underline-offset-4 decoration-sky-700"
        >
          {reference}
        </Link>
        )
      </cite>
    </blockquote>
  );
};
