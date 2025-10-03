"use client";

import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart3, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard" },
    { icon: Users, label: "Networks", path: "/dashboard/networks" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#FF7B00]">CPA Hub</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-[#FF7B00] text-white"
                  : "text-gray-700 hover:bg-[#FFF5EB] hover:text-[#FF7B00]"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;