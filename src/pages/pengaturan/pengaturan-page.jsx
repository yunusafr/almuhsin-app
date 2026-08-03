import { useState } from "react";
import { Bell, LogOut, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import useAuthStore from "@/features/auth/stores/auth-store";
import { removeToken } from "@/features/auth/lib/token";

export default function PengaturanPage() {
  const { resolvedTheme, setTheme } = useTheme();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutStore = useAuthStore((s) => s.logout);

  const [notifications, setNotifications] = useState({
    presensi: true,
    pembayaran: true,
    tagihan: false,
  });

  function handleToggle(key) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleLogout() {
    removeToken();
    logoutStore();
    queryClient.clear();
    navigate("/login", { replace: true });
  }

  const themeOptions = [
    { key: "light", label: "Terang", icon: Sun },
    { key: "dark", label: "Gelap", icon: Moon },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengaturan"
        description="Sesuaikan preferensi tampilan dan notifikasi aplikasi Anda."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tampilan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-green-600 dark:text-green-400" />
              Tampilan
            </CardTitle>

            <CardDescription>
              Pilih tema yang nyaman untuk Anda.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-3">
            {themeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setTheme(option.key)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border p-5 text-sm font-medium transition",
                  resolvedTheme === option.key
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-green-300 hover:text-foreground"
                )}
              >
                <option.icon className="h-6 w-6" />

                {option.label}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Notifikasi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
              Notifikasi
            </CardTitle>

            <CardDescription>
              Kelola jenis notifikasi yang ingin Anda terima.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {[
              { key: "presensi", label: "Presensi santri", desc: "Pemberitahuan saat presensi dicatat." },
              { key: "pembayaran", label: "Pembayaran masuk", desc: "Pemberitahuan saat ada pembayaran baru." },
              { key: "tagihan", label: "Tagihan jatuh tempo", desc: "Pengingat tagihan yang mendekati jatuh tempo." },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 rounded-2xl border bg-muted/30 p-4"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>

                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>

                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={() => handleToggle(item.key)}
                  aria-label={item.label}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
            Sesi
          </CardTitle>

          <CardDescription>
            Keluar dari aplikasi untuk mengakhiri sesi Anda saat ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />

            Keluar dari Aplikasi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
