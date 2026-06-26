import { useEffect } from "react";

import { me } from "@/features/auth/services/auth.service";
import useAuthStore from "@/features/auth/stores/auth-store";

import { getToken, removeToken } from "@/features/auth/lib/token";

export default function AuthProvider({ children }) {
  const setUser = useAuthStore((s) => s.setUser);
  const finishLoading = useAuthStore((s) => s.finishLoading);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const initialize = async () => {
      const token = getToken();

      if (!token) {
        finishLoading();
        return;
      }

      try {
        const user = await me();

        setUser(user);
      } catch (error) {
        removeToken();
        logout();
      } finally {
        finishLoading();
      }
    };

    initialize();
  }, []);

  return children;
}
