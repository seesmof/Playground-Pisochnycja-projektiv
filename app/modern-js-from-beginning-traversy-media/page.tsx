import React from "react";
import Gallery from "./components/Gallery";

const MainPage = () => {
  const PagesData = [
    {
      name: "Console",
      link: "console",
    },
  ];

  return (
    <>
      <Gallery Pages={PagesData} pageName="Modern JavaScript from Beginning" />
    </>
  );
};

export default MainPage;
