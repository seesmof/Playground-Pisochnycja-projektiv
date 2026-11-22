"use client";

import Image from "next/image";

type BookType =
  | "Духовне читання"
  | "Богослов'я"
  | "Апологетика"
  | "Християнське життя"
  | "Класика";

type Book = {
  name: string;
  author: string;
  image: string;
  type: BookType;
};

const books: Book[] = [
  {
    name: "Подорож пілігрима",
    author: "Джон Беньян",
    image: "/pilgrims-progress.jpg",
    type: "Класика",
  },
  {
    name: "Просто християнство",
    author: "К.С. Льюїс",
    image: "/mere-christianity.png",
    type: "Апологетика",
  },
  {
    name: "Пізнання Бога",
    author: "Дж. І. Пакер",
    image: "/knowing-god.png",
    type: "Богослов'я",
  },
];

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-3xl p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {books.map((book, index) => (
            <article
              className="flex flex-col gap-3 rounded-md overflow-hidden bg-white"
              key={index}
            >
              <Image
                src={book.image}
                alt={`Обкладинка книжки під назвою "${book.name}" від автора "${book.author}".`}
                width={1080}
                height={1920}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
