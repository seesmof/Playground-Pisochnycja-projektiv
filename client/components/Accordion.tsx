"use client";

import { useState } from "react";

interface ItemProps {
  title: string;
  description: string;
}

const AccordionItem = ({ title, description }: ItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="justify-between flex flex-row p-3 bg-slate-200 rounded-md cursor-pointer"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <p>{title}</p>
        <span>{isOpen ? "/\\" : "\\/"}</span>
      </div>
      {isOpen && (
        <div className="rounded-md p-3 outline-2 outline-slate-200">
          {description}
        </div>
      )}
    </>
  );
};

const items: ItemProps[] = [
  { title: "Who was swallowed up by a giant fish?", description: "Jonah" },
  { title: "Who killed people with donkey's jaw?", description: "Samson" },
  { title: "Who split the sea?", description: "Moses" },
  {
    title: "Who raised up Lazarus from the dead?",
    description: "Jesus Christ",
  },
  { title: "Who was a 'weeping prophet'?", description: "Jeremiah" },
];

const Accordion = () => {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Accordion;
