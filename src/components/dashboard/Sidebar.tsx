"use client";

import { useState } from "react";
import { Home, Search, Plus, Heart, User, Bookmark, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Search, label: "Search", id: "search" },
    { icon: Plus, label: "Create", id: "create" },
    { icon: Heart, label: "Favorites", id: "favorites" },
    { icon: User, label: "Profile", id: "profile" },
    { icon: Bookmark, label: "Saved", id: "saved" },
  ];

  const getIconColor = (itemId: string) => {
    if (activeTab === itemId) {
      return "text-[#FF7B00]";
    }
    return "text-gray-500";
  };

  const getLabelColor = (itemId: string) => {
    if (activeTab === itemId) {
      return "text-[#FF7B00]";
    }
    return "text-gray-700";
  };

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-16'} bg-[#FFFFFF] border-r border-gray-200 flex flex-col py-4 transition-all duration-300 ease-in-out`}>
      {/* Logo and App Name */}
      <div className="flex items-center justify-center mb-8 px-4">
        <div className="w-10 h-10 bg-[#FF7B00] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        {isExpanded && (
          <span className="ml-3 text-xl font-bold text-[#FF7B00] whitespace-nowrap">
            CPA Dashboard
          </span>
        )}
      </div>
      
      {/* Navigation Icons - Vertically Centered */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${isExpanded ? 'justify-center px-4' : 'justify-center'} p-3 rounded-full hover:bg-[#FFF5EB] transition-all duration-200 ${
                activeTab === item.id ? 'bg-[#FFF5EB]' : ''
              }`}
            >
              <Icon className={`w-6 h-6 ${getIconColor(item.id)} flex-shrink-0`} />
              {isExpanded && (
                <span className={`ml-4 whitespace-nowrap font-semibold ${getLabelColor(item.id)}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Menu button at bottom */}
      <div className="flex justify-center mt-8">
        <button
          onClick={toggleSidebar}
          className={`w-full flex items-center ${isExpanded ? 'justify-center px-4' : 'justify-center'} p-3 rounded-full hover:bg-[#FFF5EB] transition-colors duration-200`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-gray-500 flex-shrink-0" />
          ) : (
            <Menu className="w-6 h-6 text-gray-500 flex-shrink-0" />
          )}
          {isExpanded && (
            <span className="ml-4 text-gray-700 whitespace-nowrap font-semibold">
              Close Menu
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;