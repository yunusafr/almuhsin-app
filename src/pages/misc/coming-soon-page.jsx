import { Hammer, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import PageHeader from "@/components/common/page-header";

export default function ComingSoonPage({ title, description }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />

      <div className="flex flex-col items-center justify-center rounded-3xl border bg-card px-6 py-20 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
          <Shield size={36} className="text-primary" />
        </div>

        <h2 className="mt-6 text-2xl font-bold">Fitur Segera Hadir</h2>

        <p className="mt-2 max-w-md text-muted-foreground">
          Modul <span className="font-semibold text-foreground">{title}</span>{" "}
          sedang dalam pengembangan. Fitur ini akan tersedia pada rilis
          berikutnya.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400">
          <Hammer size={14} />
          Dalam Pengembangan
        </div>

        <Button
          variant="outline"
          className="mt-8"
          onClick={() => navigate("/app")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
}
