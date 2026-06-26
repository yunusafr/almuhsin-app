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
    relative h-screen
    border-r border-green-500/30
    bg-gradient-to-b from-green-600 to-green-700
    text-white
    shadow-2xl
    transition-all
    duration-300
    ${collapsed ? "w-20" : "w-72"}
  `}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <AppLogo collapsed={collapsed} />
      </div>

      {/* Menu */}
      <nav className="px-3 py-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
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

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs text-green-100">Logged in as</p>

            <h3 className="mt-1 font-semibold">{dummyUser.name}</h3>

            <p className="text-xs capitalize text-green-100">
              {dummyUser.role}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
