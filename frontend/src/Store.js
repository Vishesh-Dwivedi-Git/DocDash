import { create } from "zustand";

const Store = create((set) => ({
  items: [],
  addItem: (title, description, link) => set((state) => ({
    items: [...state.items, { title, description, link }]
  })),
  resetItems: () => set({ items: [] })
}));

export default Store;
