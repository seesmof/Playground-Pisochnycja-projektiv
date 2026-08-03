"use client";

import { useState } from "react";

export interface CartItem {
  name: string;
  price: number;
}

export default function IndexPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [items, setItems] = useState<CartItem[]>([
    { name: "iPhone 15 Max", price: 1000 },
    { name: "MacBook Air", price: 1500 },
    { name: "Air Pods Pro", price: 500 },
  ]);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-md w-full gap-3 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-md bg-white p-3 outline outline-sky-600 flex flex-col"
          >
            <h2>{item.name}</h2>
            <p>$ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
