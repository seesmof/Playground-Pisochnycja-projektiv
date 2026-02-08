export interface VerseType {
  text: string;
  reference: string;
}

export const Verse: React.FC<VerseType> = ({ text, reference }) => {
  return (
    <blockquote className="border-l-2 pl-4 border-sky-700">
      {text}{" "}
      <cite>
        (<em>{reference}</em>)
      </cite>
    </blockquote>
  );
};
