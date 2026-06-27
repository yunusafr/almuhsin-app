import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function FormActions({
  loading = false,
  submitLabel = "Simpan",
  cancelLabel = "Batal",
  onCancel,
  hideCancel = false,
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-6">
      {!hideCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelLabel}
        </Button>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="min-w-36"
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        {submitLabel}
      </Button>
    </div>
  );
}