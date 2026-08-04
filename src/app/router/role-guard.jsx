import { Navigate } from "react-router-dom";

import useAuthStore from "@/features/auth/stores/auth-store";

/**
 * Pengaman rute berbasis role.
 *
 * `roles` = daftar role yang diizinkan mengakses halaman.
 * Pengguna dengan role di luar daftar diarahkan ke dashboard.
 */
export default function RoleGuard({ roles, children }) {
  const user = useAuthStore((s) => s.user);
  const userRoles = useAuthStore((s) => s.roles);

  const effectiveRoles =
    userRoles.length > 0
      ? userRoles
      : user?.role
        ? [user.role]
        : [];

  const allowed = roles.some((role) =>
    effectiveRoles.includes(role)
  );

  if (!allowed) {
    return <Navigate to="/app" replace />;
  }

  return children;
}
