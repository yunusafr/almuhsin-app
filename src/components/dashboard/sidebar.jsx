import { NavLink, Link } from "react-router-dom";

import { sidebarMenus } from "@/constants/sidebar-menu";
import useAuthStore from "@/features/auth/stores/auth-store";
import { useSidebarStore } from "@/app/store/sidebar-store";
import { getPrimaryRole } from "@/features/auth/lib/roles";

import AppLogo from "./app-logo";

function getInitials(name) {
  return (name ?? "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Sidebar() {
  const { collapsed } = useSidebarStore();

  const user = useAuthStore((s) => s.user);
  const roles = useAuthStore((s) => s.roles);

  const role = getPrimaryRole(user, roles);

  const menus = sidebarMenus[role] ?? [];

  return (
    <aside
      className={`
hidden
lg:flex
relative
flex-col
h-screen
border-r
border-green-500/20
bg-gradient-to-b
from-green-700
via-green-600
to-green-700
transition-all
duration-300
shadow-2xl
text-white
${collapsed ? "w-20" : "w-72"}
`}
    >
      {/* Header — klik logo menuju dashboard */}
      <Link
        to="/app"
        aria-label="Ke dashboard"
        className="flex h-16 shrink-0 items-center border-b border-white/10 px-5"
      >
        <AppLogo collapsed={collapsed} />
      </Link>

      {/* Menu */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end
              className={({ isActive }) =>
                `
                group flex items-center gap-3
                rounded-xl
                px-4 py-3
                transition-all duration-200

                ${
                  isActive
                    ? "bg-green-800 text-white font-semibold"
                    : "text-white hover:bg-green-800/30 hover:text-white"
                }
              `
              }
            >
              <Icon
                size={20}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              {!collapsed && (
                <span className="text-sm font-medium tracking-wide">
                  {menu.title}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer — badge user menyesuaikan ukuran sidebar */}
      <div className="mt-auto shrink-0 px-3 py-4">
        {collapsed ? (
          <div
            title={`${user?.name ?? "Pengguna"} — ${role}`}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white"
          >
            {getInitials(user?.name)}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs text-green-100">Logged in as</p>

            <h3 className="mt-1 truncate font-semibold">{user?.name}</h3>

            <p className="text-xs capitalize text-green-100">
              {role ?? "Pengguna"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
