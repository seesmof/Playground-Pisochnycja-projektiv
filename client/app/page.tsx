export default function Page() {
  return (
    <div className="grid grid-rows-7 gap-1 grid-cols-12">
      {Array.from({ length: 31 }, (_, i) => i + 1).map((day, index) => (
        <div
          className="aspect-square bg-stone-300 h-5 w-full"
          key={index}
        ></div>
      ))}
    </div>
  );
}
