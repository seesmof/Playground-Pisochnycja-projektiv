export interface Note {
  heading: string;
  text: string;
}

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white w-full rounded-md p-3">
      <h3 className="text-lg pb-3 font-medium">{note.heading}</h3>
      <p className="wrap-break-word">{note.text}</p>
    </div>
  );
}
