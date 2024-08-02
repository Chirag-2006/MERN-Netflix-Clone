import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: "movie", // default content type is movie (can be movie or tv)
  setContentType: (type) => set({ contentType: type }),
  
}));
