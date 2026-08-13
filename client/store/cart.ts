import { create } from "zustand";

export type Item = {
  id: number;
  name: string;
  price: number;
};

export type CartState = {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: number) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}));
