import Search from "@/components/Search";

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto w-full p-3 md:mt-5">
        <header className="mb-5">
          <h1 className="text-3xl md:text-5xl font-black">Cars Search</h1>
          <p className="text-lg text-stone-700 mt-3 md:mt-5">
            This is a simple car manufacturers search snippet.
          </p>
        </header>
        <Search />
      </div>
    </div>
  );
};

export default Page;
