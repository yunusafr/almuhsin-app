import StatCard from "@/components/dashboard/stat-card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Jumlah Santri" value="1.250" />

        <StatCard title="Jumlah Asatidz" value="45" />

        <StatCard title="Presensi Hari Ini" value="1.120" />

        <StatCard title="Pembayaran Bulan Ini" value="Rp 54 Juta" />
      </div>
    </div>
  );
}
