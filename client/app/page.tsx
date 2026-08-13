"use client";

import { Button } from "@/components/ui/button";
import { Item, useCart } from "@/store/cart";

export default function IndexPage() {
  const { items, add, remove } = useCart();

  return (
    <div className="min-h-screen flex overflow-hidden">
      <aside className="w-60 bg-gray-800 text-white p-3 h-screen fixed">
        Amen
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-100 ml-60 p-3">
        <div className="mb-4">
          <Button
            onClick={() => {
              const newItem: Item = {
                id: crypto.randomUUID(),
                name: "iPhone 15 Pro",
                price: 1000,
              };
              add(newItem);
              console.log(newItem.id);
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <Button variant={"destructive"} onClick={() => remove(item.id)}>
                Remove
              </Button>
              <div>
                {item.id}. {item.name} costs {item.price}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
