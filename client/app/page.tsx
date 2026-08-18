"use client";

import { Button } from "@/components/ui/button";
import { Item, useCart } from "@/store/cart";

export default function IndexPage() {
  const { items, add } = useCart();

  return (
    <div className="min-h-screen flex overflow-hidden">
      <aside className="w-60 p-3 h-screen fixed border-r-2">Amen</aside>
      <main className="flex-1 overflow-y-auto ml-60 p-3">
        <Button
          onClick={() => {
            const newItem: Item = {
              id: crypto.randomUUID(),
              name: "iPhone 15 Pro",
              price: 1000,
            };
            add(newItem);
          }}
        >
          Add
        </Button>
        {items.map((item) => (
          <div key={item.id}>
            {item.id}. {item.name} costs ${item.price}.
          </div>
        ))}
      </main>
    </div>
  );
}
