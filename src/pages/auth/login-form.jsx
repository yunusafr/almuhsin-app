import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLogin } from "@/features/auth/hooks/use-login";

const schema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (values) => {
    loginMutation.mutate(values, {
      onSuccess() {
        navigate("/app");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          {...register("email")}
          className="w-full rounded-xl border bg-background p-3 outline-none transition focus:border-green-600"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>

        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border bg-background p-3 outline-none transition focus:border-green-600"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 font-medium text-white transition hover:bg-green-700 disabled:opacity-70"
      >
        {loginMutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Masuk
      </button>

      {loginMutation.isError && (
        <p className="text-center text-sm text-red-500">
          {loginMutation.error?.response?.data?.message ?? "Login gagal"}
        </p>
      )}
    </form>
  );
}
