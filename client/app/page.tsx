"use client";

import Image from "next/image";

type Book = {
  name: string;
  author: string;
  image: string;
  price: number;
};

const books: Book[] = [
  {
    name: "Подорож пілігрима",
    author: "Джон Буньян",
    image: "/pilgrims-progress.jpg",
    price: 200,
  },
  {
    name: "Просто християнство",
    author: "К.С. Льюїс",
    image: "/mere-christianity.png",
    price: 150,
  },
  {
    name: "Сповідь",
    author: "Святий Августин",
    image: "/confessions.webp",
    price: 100,
  },
];

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="mx-auto max-w-3xl p-3">
        <div className="grid grid-cols-3 gap-3">
          {books.map((book, index) => (
            <article
              className="flex flex-col rounded-md overflow-hidden bg-white"
              key={index}
            >
              <Image
                src={book.image}
                alt={`Обкладинка книжки під назвою "${book.name}" від автора "${book.author}".`}
                width={1080}
                height={1920}
                className="aspect-2/3 object-cover"
              />
              <div className="p-3 flex-col flex">
                <h3 className="font-bold">{book.name}</h3>
                <em className="mt-1 mb-3">{book.author}</em>
                <p className="font-bold text-lg">₴ {book.price}</p>
                <button className="btn mt-1">Придбати</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
