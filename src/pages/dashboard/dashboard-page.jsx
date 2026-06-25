import { Users, Wallet, UserCog, ClipboardCheck } from "lucide-react";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import SectionCard from "@/components/common/section-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Ringkasan aktivitas pondok pesantren"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Jumlah Santri"
          value="1.250"
          trend="+12%"
          icon={Users}
        />

        <StatCard
          title="Jumlah Asatidz"
          value="45"
          trend="+5%"
          icon={UserCog}
        />

        <StatCard
          title="Presensi Hari Ini"
          value="1.120"
          trend="+8%"
          icon={ClipboardCheck}
        />

        <StatCard
          title="Pembayaran"
          value="Rp54jt"
          trend="+15%"
          icon={Wallet}
        />
      </div>

      <SectionCard
        title="Aktivitas Terbaru"
        description="Aktivitas pondok hari ini"
      >
        <p className="text-muted-foreground">Belum ada aktivitas.</p>
      </SectionCard>
    </div>
  );
}
