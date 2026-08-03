import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    defaultValues: {
      email: "",
      password: "",
    },
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
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>

        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            className="h-11 rounded-xl pl-10"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>

        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="h-11 rounded-xl pl-10"
            {...register("password")}
          />
        </div>

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loginMutation.isPending}
        className="h-12 w-full rounded-xl text-base font-semibold"
      >
        {loginMutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        Masuk
      </Button>

      {loginMutation.isError && (
        <p className="text-center text-sm text-destructive">
          {loginMutation.error?.response?.data?.message ?? "Login gagal"}
        </p>
      )}
    </form>
  );
}
