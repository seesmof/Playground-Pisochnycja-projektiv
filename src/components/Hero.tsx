export default function HeroSection() {
  return (
    <>
      <div className="flex flex-col px-4 py-24">
        <h1>
          <span className="font-extrabold text-7xl tracking-tighter">
            monorepo
          </span>
          <span className="text-yellow-600 text-4xl">.tools</span>
        </h1>
        <div className="text-2xl mt-12 flex flex-col border-l-4 ml-[30%] border-yellow-600 pl-4">
          <p>
            Everything you need to know about monorepos, and the tools to build
            them.
          </p>
          <cite className="italic text-xs text-stone-400 self-end mt-3">
            - Made with love by Nx
          </cite>
        </div>
      </div>
    </>
  );
}
