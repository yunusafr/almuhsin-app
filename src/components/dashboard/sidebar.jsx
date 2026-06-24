import { NavLink } from "react-router-dom";

import { sidebarMenus } from "@/constants/sidebar-menu";
import { dummyUser } from "@/constants/dummy-user";

export default function Sidebar() {
  const menus = sidebarMenus[dummyUser.role];

  return (
    <aside className="w-72 border-r bg-white">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="font-bold text-green-700">Almuhsin App</h1>
      </div>

      <div className="p-4 space-y-2">
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
                ${isActive ? "bg-green-600 text-white" : "hover:bg-gray-100"}
                `
              }
            >
              <Icon size={18} />

              <span>{menu.title}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
