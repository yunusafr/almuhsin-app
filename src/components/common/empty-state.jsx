import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Data Kosong",
  description = "Belum ada data",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Inbox size={48} className="text-slate-300" />

      <h3 className="font-semibold mt-4">{title}</h3>

      <p className="text-slate-500">{description}</p>
    </div>
  );
}
