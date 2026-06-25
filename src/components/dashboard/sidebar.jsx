import { NavLink } from "react-router-dom";

import { sidebarMenus } from "@/constants/sidebar-menu";
import { dummyUser } from "@/constants/dummy-user";

import { useSidebarStore } from "@/app/store/sidebar-store";

import AppLogo from "./app-logo";

export default function Sidebar() {
  const { collapsed } = useSidebarStore();

  const menus = sidebarMenus[dummyUser.role];

  return (
    <aside
      className={`
      border-r bg-white transition-all
      ${collapsed ? "w-20" : "w-72"}
    `}
    >
      <div className="h-16 px-4 flex items-center border-b">
        <AppLogo collapsed={collapsed} />
      </div>

      <div className="p-3 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3 rounded-xl
                transition-all

                ${isActive ? "bg-green-600 text-white" : "hover:bg-slate-100"}
                `
              }
            >
              <Icon size={18} />

              {!collapsed && <span>{menu.title}</span>}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
