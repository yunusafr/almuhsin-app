import { create } from "zustand";

import { normalizeRoles } from "../lib/roles";

const useAuthStore = create((set) => ({
  user: null,
  roles: [],
  token: null,

  isAuthenticated: false,
  isLoading: true,

  login(user, token) {
    set({
      user,
      token,
      roles: normalizeRoles(user),
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUser(user) {
    set({
      user,
      roles: normalizeRoles(user),
      isAuthenticated: true,
      isLoading: false,
    });
  },

  finishLoading() {
    set({
      isLoading: false,
    });
  },

  logout() {
    set({
      user: null,
      roles: [],
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));

export default useAuthStore;
