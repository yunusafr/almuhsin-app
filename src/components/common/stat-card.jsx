import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>

            <h2 className="text-3xl font-bold mt-2">{value}</h2>
          </div>

          {Icon && <Icon size={28} className="text-green-600" />}
        </div>
      </CardContent>
    </Card>
  );
}
