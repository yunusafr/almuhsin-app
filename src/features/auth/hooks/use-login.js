import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/services/auth.service";
import { setToken } from "@/features/auth/lib/token";
import useAuthStore from "@/features/auth/stores/auth-store";

export function useLogin() {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: login,

    onSuccess(data) {
      setToken(data.token);
      loginStore(data.user, data.token);
    },
  });
}
