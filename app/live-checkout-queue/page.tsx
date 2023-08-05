// Given a number of cash desks and a live queue of people with their number of items, make user be able to enter a number and add that number to the queue with the least amount of items in it. Additionally, on each cash desk make it so each second or half a second the amount of items is decremented live.

"use client";
import { useEffect, useState } from "react";

// input box with button to add

// a list of cash desks each of which is able to have a queue with some number of items
// a useEffect most likely for each of the cash desks to update the queue each 500ms
// separate that into a component where we have the cash desk number and queue as a state

// a function that fires on items add and looks for a cash desk with the least amount of items in its queue

interface CashDeskProps {
  deskNumber: number;
  itemsInQueue: number;
  setItemsInQueue: any;
}

const CashDesk = ({
  deskNumber,
  itemsInQueue,
  setItemsInQueue,
}: CashDeskProps) => {
  return (
    <>
      <div className="w-full flex items-center justify-center rounded-md p-4 font-medium border-2">
        <div className="flex flex-col items-center gap-1">
          <h2>Number: {deskNumber}</h2>
          <p>Queue: {itemsInQueue}</p>
        </div>
      </div>
    </>
  );
};

const MainPage = () => {
  const [queueItemsForEachDesk, setQueueItemsForEachDesk] = useState([
    0, 0, 0, 0, 0,
  ]);
  const CASH_DESKS = 5;

  return (
    <>
      <div className="flex flex-col p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-row items-center gap-2">
          <input type="number" className="p-2 rounded-md border-2 w-full" />
          <button className="p-2 px-4 rounded-md bg-blue-500 border-2 border-blue-500 text-white font-medium">
            checkout
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 py-4">
          {queueItemsForEachDesk.map((item, index) => (
            <CashDesk
              key={index}
              deskNumber={index + 1}
              itemsInQueue={item}
              setItemsInQueue={setQueueItemsForEachDesk}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
