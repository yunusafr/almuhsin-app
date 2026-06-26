import { NavLink } from "react-router-dom";
import useAuthStore from "@/features/auth/stores/auth-store";
import { sidebarMenus } from "@/constants/sidebar-menu";

export default function MobileBottomBar() {
  const roles = useAuthStore((s) => s.roles);

  const role = roles?.[0] ?? "Super Admin";

  const menus = (sidebarMenus[role] ?? []).slice(0, 6);

  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      border-t
      bg-white/95
      backdrop-blur-xl
      lg:hidden
      dark:bg-slate-900/95
    "
    >
      <div className="grid grid-cols-6">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `
                flex
                flex-col
                items-center
                justify-center
                gap-1
                py-3
                transition

                ${isActive ? "text-green-600" : "text-slate-500"}
              `
              }
            >
              <Icon size={20} />

              <span className="text-[10px]">{menu.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
