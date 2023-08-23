import Gallery from "@/components/Gallery";

export default function Home() {
  const Projects = [
    {
      name: "ShadCN Play Around",
      link: "/shadcn-play-around",
    },
    {
      name: "Modern JS from Beginning",
      link: "modern-js-from-beginning-traversy-media",
    },
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
    {
      name: "Social Media Feed",
      link: "/social-media-feed",
    },
    {
      name: "ToDo App",
      link: "/todo-app",
    },
    {
      name: "Chuck Norris Quote Generator",
      link: "/chuck-norris-quote-generator",
    },
    {
      name: "Shopping Cart with useReducer",
      link: "/shopping-cart-with-useReducer",
    },
    {
      name: "AI Greeting Generator",
      link: "/ai-greeting-generator",
    },
    {
      name: "Memory Cards Game",
      link: "/memory-cards-game",
    },
  ];

  return (
    <>
      <Gallery Projects={Projects} projectName="Code Doodles" />
    </>
  );
}
