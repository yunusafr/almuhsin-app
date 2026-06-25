import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <Card className="rounded-3xl border">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h2 className="text-3xl font-bold mt-3">{value}</h2>

            {trend && (
              <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={14} />
                {trend}
              </div>
            )}
          </div>

          {Icon && (
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
