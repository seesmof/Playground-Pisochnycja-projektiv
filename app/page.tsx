import Gallery from "@/components/Gallery";

export default function Home() {
  const Projects = [
    {
      name: "Regex Golf",
      link: "/regex-golf",
    },
    {
      name: "Tic Tac Toe",
      link: "/tic-tac-toe",
    },
    {
      name: "Live Checkout Queue",
      link: "/live-checkout-queue",
    },
  ];

  return (
    <>
      <Gallery Projects={Projects} projectName="Codewell" />
    </>
  );
}
