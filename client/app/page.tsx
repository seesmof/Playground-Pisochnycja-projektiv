export default function Page() {
  return (
    <div className="grid gap-1 grid-cols-[repeat(auto-fill, 16px)]">
      {Array.from({ length: 31 }, (_, i) => i + 1).map((day, index) => (
        <div
          className="aspect-square bg-stone-300 h-5 w-full col-span-1"
          key={index}
        ></div>
      ))}
    </div>
  );
}
