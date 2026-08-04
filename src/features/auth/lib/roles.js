/**
 * Normalisasi nama role & daftar role pengguna.
 *
 * API live mengembalikan `user.role` (string tunggal, mis. "Ustadz")
 * pada response login, sementara sebagian data memakai `user.roles`
 * (array). Helper ini menangani kedua bentuk + alias nama role
 * (Ustadz == Asatidz) agar sidebar & permission konsisten.
 */

const ROLE_ALIASES = {
  ustadz: "Asatidz",
  asatidz: "Asatidz",
};

export function normalizeRole(role) {
  const key = String(role ?? "").toLowerCase();

  return ROLE_ALIASES[key] ?? role;
}

export function normalizeRoles(user) {
  const rawRoles = Array.isArray(user?.roles) ? user.roles : [];

  const roles = rawRoles.length > 0 ? rawRoles : user?.role ? [user.role] : [];

  return roles.map(normalizeRole);
}

export function getPrimaryRole(user, roles = []) {
  const effective = roles.length > 0 ? roles : normalizeRoles(user);

  return normalizeRole(effective?.[0]);
}
