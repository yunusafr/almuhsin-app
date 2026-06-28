import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";

import { useUpdateAcademicYear } from "@/features/academic-year/hooks/use-academic-year";

export default function AcademicYearSwitch({ academicYear }) {
  const mutation = useUpdateAcademicYear();

  const handleChange = (checked) => {
    mutation.mutate(
      {
        id: academicYear.id,

        payload: {
          name: academicYear.name,
          is_active: checked,
        },
      },
      {
        onSuccess: (res) => {
          toast.success(res.message ?? "Status berhasil diubah");
        },

        onError: (err) => {
          toast.error(err.response?.data?.message ?? "Gagal mengubah status");
        },
      },
    );
  };

  if (mutation.isPending) {
    return <Loader2 className="h-4 w-4 animate-spin text-green-600" />;
  }

  return (
    <Switch checked={academicYear.is_active} onCheckedChange={handleChange} />
  );
}
