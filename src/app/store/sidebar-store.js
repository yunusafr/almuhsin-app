import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  collapsed: false,

  toggle: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),

  close: () =>
    set({
      collapsed: true,
    }),

  open: () =>
    set({
      collapsed: false,
    }),
}));
