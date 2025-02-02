import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  items: [],  // Default empty array for items

  // Fetch items from API and update store
  fetchItems: async () => {
    try {
      const token = localStorage.getItem("token");

      // Request with token (ensure the token exists)
      const response = await axios.get("http://localhost:3000/api/v1/content", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
      });

      console.log("Fetched Data:", response.data.content);  // Debugging to check fetched data

      // Assuming response.data is an array
      const data = response.data.content;
      // Update the store with fetched items
      set({ items: data });

      console.log("Updated items in store:", data);  // Check if items are updated in the store

    } catch (error) {
      console.error("Error fetching items:", error);
      set({ items: [] });  // Reset state if there is an error
    }
  },

  // Add an item manually to the store
  addItem: (link, type, title) => set((state) => ({
    items: [...state.items, { link, type, title }],
  })),

  // Reset all items in the store
  resetItems: () => set({ items: [] }),
}));

export default useStore;


export const useSidebarStore = create((set) => ({
  open: true, // Default state
  setOpen: (toggle) => set(() => ({ open: toggle })), // Setter function
  toggleOpen: () => set((state) => ({ open: !state.open })), // Toggle function
}));

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token:null,
  login: (token) => set({ isAuthenticated: true,token}),
  logout: () => set({ isAuthenticated: false ,token:null}),
}));