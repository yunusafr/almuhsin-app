import { Compass, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center dark:bg-slate-950">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
        <Compass size={44} className="text-primary" />
      </div>

      <h1 className="mt-8 text-7xl font-black tracking-tight text-foreground">
        404
      </h1>

      <h2 className="mt-2 text-xl font-semibold">Halaman Tidak Ditemukan</h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>

      <Button className="mt-8" onClick={() => navigate("/")}>
        <Home className="mr-2 h-4 w-4" />
        Kembali ke Beranda
      </Button>
    </div>
  );
}
