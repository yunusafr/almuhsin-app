import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  FormWrapper,
  FormSection,
  FormGrid,
  FormInput,
  FormActions,
} from "@/components/form";

import {
  createSecurityGuardSchema,
  updateSecurityGuardSchema,
} from "@/features/security-guards/schemas/security-guard-schema";
import {
  useCreateSecurityGuard,
  useUpdateSecurityGuard,
} from "@/features/security-guards/hooks/use-security-guards";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

export default function SecurityGuardDialog({ open, onOpenChange, data }) {
  const isEdit = !!data;

  const createMutation = useCreateSecurityGuard();
  const updateMutation = useUpdateSecurityGuard();

  const form = useForm({
    resolver: zodResolver(
      isEdit ? updateSecurityGuardSchema : createSecurityGuardSchema,
    ),
    values: data ?? INITIAL_VALUES,
  });

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        const payload = {
          name: values.name,
          email: values.email,
          // Kosongkan password jika tidak ingin mengganti.
          ...(values.password ? { password: values.password } : {}),
        };

        await updateMutation.mutateAsync({ id: data.id, payload });

        toast.success("Data satpam berhasil diperbarui");
      } else {
        await createMutation.mutateAsync({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        toast.success("Akun satpam dan akun login berhasil dibuat!");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          (isEdit
            ? "Gagal memperbarui data satpam."
            : "Gagal membuat akun satpam."),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Ubah Akun Satpam" : "Tambah Akun Satpam"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Perbarui nama, email, atau reset password akun satpam."
              : "Buat akun login ber-role Keamanan untuk petugas satpam."}
          </DialogDescription>
        </DialogHeader>

        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormSection title="Data Akun">
            <FormGrid>
              <FormInput
                control={form.control}
                name="name"
                label="Nama"
                placeholder="Satpam Budi"
              />

              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="budi@pesantren.app"
              />
            </FormGrid>

            <FormInput
              control={form.control}
              name="password"
              label={isEdit ? "Password Baru (kosongkan jika tidak diganti)" : "Password"}
              type="password"
              placeholder={isEdit ? "Minimal 6 karakter" : "Minimal 6 karakter"}
            />
          </FormSection>

          <FormActions
            loading={
              isEdit
                ? updateMutation.isPending
                : createMutation.isPending
            }
            submitLabel={isEdit ? "Simpan Perubahan" : "Buat Akun"}
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
