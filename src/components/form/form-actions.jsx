import { Button } from "@/components/ui/button";

export default function FormActions({ loading }) {
  return (
    <div className="flex justify-end gap-3 p-6">
      <Button type="button" variant="outline">
        Batal
      </Button>

      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}
