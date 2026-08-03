import { BadgeCheck, Mail, ShieldCheck, UserRound } from "lucide-react";

import PageHeader from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import useAuthStore from "@/features/auth/stores/auth-store";

export default function ProfilPage() {
  const user = useAuthStore((s) => s.user);
  const roles = useAuthStore((s) => s.roles);

  const role = roles?.[0] ?? "Super Admin";

  const initials = (user?.name ?? "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const details = [
    { icon: UserRound, label: "Nama", value: user?.name ?? "-" },
    { icon: Mail, label: "Email", value: user?.email ?? "-" },
    { icon: ShieldCheck, label: "Role", value: role },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profil Saya"
        description="Informasi akun dan hak akses Anda di Almuhsin App."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Kartu identitas */}
        <Card>
          <CardHeader>
            <CardTitle>Identitas</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 text-xl">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <h2 className="mt-4 text-lg font-semibold">{user?.name}</h2>

            <p className="text-sm text-muted-foreground">{user?.email}</p>

            <Badge variant="secondary" className="mt-3 capitalize">
              <BadgeCheck className="mr-1 h-3.5 w-3.5" />
              {role}
            </Badge>
          </CardContent>
        </Card>

        {/* Detail akun */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detail Akun</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border bg-muted/30 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  <item.icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>

                  <p className="truncate font-medium capitalize">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            <p className="text-xs leading-6 text-muted-foreground">
              Data akun dikelola oleh administrator pondok. Jika ada
              perubahan data yang perlu dilakukan, hubungi Super Admin.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
