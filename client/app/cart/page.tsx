"use client";

import { CartItem } from "../page";

export default function CartPage({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="mx-auto max-w-md w-full p-3 bg-white rounded-md outline outline-sky-600 mt-3">
        {cartItems.map((item, index) => (
          <div className="border-b" key={index}></div>
        ))}
      </div>
    </div>
  );
}
