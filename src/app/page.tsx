interface Post {
  author: string;
  content: string;
}

const posts: Post[] = [
  {
    author: "Linnie Coleman",
    content:
      "“For I take no pleasure in the death of anyone who dies,” declares the Lord God. “Therefore, repent and live!”",
  },
  {
    author: "Lois Gray",
    content:
      "Every word of God proves true; he is a shield to those who take refuge in him.",
  },
  {
    author: "Edna Welch",
    content:
      "For as in one body we have many members, and the members do not all have the same function, so we, though many, are one body in Christ, and individually members one of another.",
  },
  {
    author: "Samuel Young",
    content:
      "But for you who fear my name, the sun of righteousness shall rise with healing in its wings. You shall go out leaping like calves from the stall.",
  },
  {
    author: "Landon Webster",
    content:
      "“No man shall be able to stand before you all the days of your life. Just as I was with Moses, so I will be with you. I will not leave you or forsake you.”",
  },
  {
    author: "Jane Joseph",
    content:
      "Everyone who goes on ahead and does not abide in the teaching of Christ, does not have God. Whoever abides in the teaching has both the Father and the Son.",
  },
];

export default function Page() {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 mx-auto max-w-3xl">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-md outline outline-stone-300 flex-col flex"
          >
            <blockquote className="text-lg">{post.content}</blockquote>
            <cite className="self-end">{post.author}</cite>
          </div>
        ))}
      </div>
    </div>
  );
}
