import { create } from "zustand";

export type Item = {
  id: string;
  name: string;
  price: number;
};

type CartState = {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [{ id: "1", name: "iPhone 15", price: 1000 }],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));
