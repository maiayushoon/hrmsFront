import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Bell,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const menuItems: { path: string; label: string; icon: React.ReactNode }[] = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/employees", label: "Employees", icon: <Users size={20} /> },
    { path: "/attendance", label: "Attendance", icon: <CalendarCheck size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-30">
        <SidebarContent menuItems={menuItems} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <SidebarContent menuItems={menuItems} onClickItem={() => setMobileOpen(false)} />
      </aside>

      {/* Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between">
          <button
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-5 ml-auto">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700 leading-none">Admin User</p>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1">
                  HR Manager
                </p>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
                alt="profile"
              />
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  menuItems,
  onClickItem,
}: {
  menuItems: { path: string; label: string; icon: React.ReactNode }[];
  onClickItem?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <Users size={22} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">
          HRMS<span className="text-blue-600">Lite</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive
                ? "bg-blue-50 text-blue-600 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
            onClick={onClickItem}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-1">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}