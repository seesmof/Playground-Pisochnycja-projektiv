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
  update: (id: string, updates: Partial<Item>) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  update: (id, updates) =>
    set((s) => ({
      items: s.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    })),
}));
