import { Inbox } from "lucide-react";

export default function DataTableEmpty() {
  return (
    <div className="py-20">
      <div className="flex flex-col items-center text-center">
        <div
          className="
          h-16
          w-16
          rounded-3xl
          bg-primary/10
          flex
          items-center
          justify-center
          mb-4
        "
        >
          <Inbox size={30} className="text-primary" />
        </div>

        <h3 className="font-semibold">Tidak ada data</h3>

        <p className="text-sm text-muted-foreground mt-1">
          Data akan muncul di sini.
        </p>
      </div>
    </div>
  );
}
