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
  FormSelect,
  FormActions,
} from "@/components/form";

import {
  ROLES,
  createUserSchema,
  updateUserSchema,
} from "@/features/users/schemas/user-schema";
import { useCreateUser, useUpdateUser } from "@/features/users/hooks/use-users";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const ROLE_OPTIONS = ROLES.map((role) => ({ label: role, value: role }));

export default function UserDialog({ open, onOpenChange, data }) {
  const isEdit = !!data;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    values: data
      ? { name: data.name, email: data.email, password: "", role: data.roles?.[0] ?? "" }
      : INITIAL_VALUES,
  });

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        const payload = {
          name: values.name,
          email: values.email,
          role: values.role,
          ...(values.password ? { password: values.password } : {}),
        };

        await updateMutation.mutateAsync({ id: data.id, payload });
        toast.success("Pengguna berhasil diperbarui.");
      } else {
        await createMutation.mutateAsync({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });
        toast.success("Pengguna berhasil dibuat.");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          (isEdit ? "Gagal memperbarui pengguna." : "Gagal membuat pengguna."),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Ubah Pengguna" : "Tambah Pengguna"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Perbarui data, role, atau reset password pengguna."
              : "Buat akun login untuk pengguna baru beserta perannya."}
          </DialogDescription>
        </DialogHeader>

        <FormWrapper form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormSection title="Data Pengguna">
            <FormGrid>
              <FormInput
                control={form.control}
                name="name"
                label="Nama"
                placeholder="Nama pengguna"
              />

              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="user@pesantren.app"
              />
            </FormGrid>

            <FormGrid>
              <FormSelect
                control={form.control}
                name="role"
                label="Role"
                placeholder="Pilih role"
                options={ROLE_OPTIONS}
              />

              <FormInput
                control={form.control}
                name="password"
                label={
                  isEdit
                    ? "Password Baru (kosongkan jika tidak diganti)"
                    : "Password"
                }
                type="password"
                placeholder="Minimal 6 karakter"
              />
            </FormGrid>
          </FormSection>

          <FormActions
            loading={isEdit ? updateMutation.isPending : createMutation.isPending}
            submitLabel={isEdit ? "Simpan Perubahan" : "Buat Pengguna"}
            onCancel={() => onOpenChange(false)}
          />
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
