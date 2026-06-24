import { create } from "zustand";

export const useThemeStore = create((set) => ({
  collapsed: false,

  toggleSidebar: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
}));
