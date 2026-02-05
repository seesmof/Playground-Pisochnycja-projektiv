"use client";

import { FormEvent, useState } from "react";

let currentId = 0;

interface Note {
  id: number;
  heading: string;
  text: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = {
      id: currentId,
      text: text,
      heading: heading,
    };
    setNotes([...notes, newNote]);
    currentId += 1;
  };

  return (
    <div className="bg-sky-50 min-h-screen flex flex-col gap-3">
      <form
        className="flex flex-col p-3 gap-3 bg-white m-3 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="heading"
          className="input w-full"
          placeholder="Heading here..."
          onChange={(e) => setHeading(e.target.value)}
        />
        <textarea
          name="text"
          className="textarea w-full"
          placeholder="Text here..."
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn">
          Create
        </button>
      </form>
      <div className="px-3 flex-col flex gap-3">
        {notes.map((note) => (
          <div className="bg-white w-full rounded-md p-3" key={note.id}>
            <h3 className="text-lg pb-3 font-medium">{note.heading}</h3>
            <p className="wrap-break-word">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
