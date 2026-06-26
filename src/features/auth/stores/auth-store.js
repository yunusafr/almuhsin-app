import { create } from "zustand";

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
      roles: user.roles ?? [],
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUser(user) {
    set({
      user,
      roles: user.roles ?? [],
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
