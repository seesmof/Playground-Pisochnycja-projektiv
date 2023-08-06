// Given a number of cash desks and a live queue of people with their number of items, make user be able to enter a number and add that number to the queue with the least amount of items in it. Additionally, on each cash desk make it so each second or half a second the amount of items is decremented live.

"use client";
import { FormEvent, useEffect, useState } from "react";

// input box with button to add

// a list of cash desks each of which is able to have a queue with some number of items
// a useEffect most likely for each of the cash desks to update the queue each 500ms
// separate that into a component where we have the cash desk number and queue as a state

// a function that fires on items add and looks for a cash desk with the least amount of items in its queue

const MainPage = () => {
  const [newCart, setNewCart] = useState(0);
  const [cashDesks, setCashDesks] = useState<number[][]>([[], [], [], [], []]);

  const addNewItemsToQueue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cashDesks.forEach((cashDesk) => {
      cashDesk.push(newCart);
    });
  };

  return (
    <>
      <div className="bg-slate-900 text-slate-50 p-4 min-h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={addNewItemsToQueue}
          className="flex flex-row items-center gap-2"
        >
          <input
            type="number"
            onChange={(e) => setNewCart(e.currentTarget.valueAsNumber)}
            value={newCart}
            className="rounded-md bg-slate-200 p-2 text-slate-900"
            required
          />
          <button type="submit" className="rounded-md bg-slate-700 p-2">
            Checkout
          </button>
        </form>

        <div className="flex flex-row items-center py-4 gap-2">
          {cashDesks.map((cashDesk, index) => (
            <div key={index} className="p-4 rounded-md border-2">
              {cashDesk}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
