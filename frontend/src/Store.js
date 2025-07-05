import { create } from "zustand";
import axios from "axios";

const useStore = create((set,get) => ({
  items: [],  // Default empty array for items

  // Fetch items from API and update store
  fetchItems: async () => {
    try {
      const token = localStorage.getItem("token");

      // Request with token (ensure the token exists)
      const response = await axios.get("https://docdash-production.up.railway.app/api/v1/content", { 
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
  searchQuery: "",  // Default empty search query
  setSearchQuery: (query) => set({ searchQuery: query }),  // Setter function for search query
  filterItems: () => {
    // Filter items based on search query
    const query=get().searchQuery;
    if(query.length<2)  return get().items;
    else{
           return get().items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  }
  }, 

  // Reset all items in the store
  resetItems: () => set({ items: [] }),
}));


export default useStore;

export const useUploadStore = create((set,get) => ({
  uploads: [], // Store uploaded items

  // Fetch uploaded items from API
  fetchUploads: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://docdash-production.up.railway.app/api/v1/upload", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
      });

      console.log("Fetched Uploads:", response.data.uploads);
      set({ uploads: response.data.uploads });
    } catch (error) {
      console.error("Error fetching uploads:", error);
      set({ uploads: [] });
    }
  },

  // Add an uploaded item to the store manually
  addUpload: (title, description, fileType, fileUrl) => set((state) => ({
    uploads: [...state.uploads, { title, description, fileType, fileUrl }],
  })),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  filterUploads: () => {
    const query = get().searchQuery;
    if(query.length<2)  return get().uploads;
    else{
      return get().uploads.filter((upload) => upload.title.toLowerCase().includes(query.toLowerCase()));
    }
  },
  // Reset all uploads in the store
  resetUploads: () => set({ uploads: [] }),
}));





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



export const useShareStore = create((set) => ({
  showShareBox: false,
  shareLink: "",
  copied: false,

  setShowShareBox: (value) => {
    
    set({ showShareBox: value });
  },
  setShareLink: (link) => {
   
    set({ shareLink: link });
  },
  setCopied: (value) => set({ copied: value }),
}));
