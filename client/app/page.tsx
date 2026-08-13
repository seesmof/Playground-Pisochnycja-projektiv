"use client";

import { Button } from "@/components/ui/button";
import { Item, useCart } from "@/store/cart";
import { useState } from "react";

export default function IndexPage() {
  const { items, add } = useCart();
  const [lastId, setLastId] = useState(0);

  return (
    <div className="min-h-screen flex overflow-hidden">
      <aside className="w-60 bg-gray-800 text-white p-3 h-screen fixed">
        Amen
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-100 ml-60 p-3">
        {items.map((item, index) => (
          <div key={item.id}>
            {item.name} costs {item.price}
          </div>
        ))}
        <div className="mt-4">
          <Button
            onClick={() => {
              const newItem: Item = {
                id: lastId + 1,
                name: "iPhone 15 Pro",
                price: 1000,
              };
              add(newItem);
              setLastId((id) => id + 1);
            }}
          >
            Add
          </Button>
        </div>
      </main>
    </div>
  );
}
