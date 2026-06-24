interface ChangelogItemProps {
  date: string;
  description: string;
}

const ChangelogItem = ({ date, description }: ChangelogItemProps) => {
  return (
    <div className="flex flex-row relative">
      <p className="border-r-2 pr-6">{date}</p>
      <div className="rounded-full h-4 w-4 bg-stone-900 absolute top-1 left-[9.56rem]"></div>
      <p className="pl-6">{description}</p>
    </div>
  );
};

const items: ChangelogItemProps[] = [
  {
    date: "September 3, 2024",
    description: "Announcing Projects on Frontend Roadmap",
  },
  {
    date: "August 28, 2024",
    description: "Build your learning habits with learning streaks",
  },
];

export default function Page() {
  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-3">
        <h1>Changelog</h1>
        <p>Here`s everything we have shipped in the past few days.</p>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <ChangelogItem {...item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
