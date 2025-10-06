"use client";

import { useState } from "react";
import { Home, Layout, Plus, Heart, User, Bookmark, Menu, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Layout, label: "Templates", id: "templates" },
    { icon: Plus, label: "Create", id: "create" },
    { icon: Heart, label: "Favorites", id: "favorites" },
    { icon: User, label: "Profile", id: "profile" },
    { icon: Bookmark, label: "Saved", id: "saved" },
  ];

  const getTabStyles = (itemId: string) => {
    const isActive = activeTab === itemId;
    
    return {
      icon: isActive ? "text-[#FF7B00]" : "text-gray-500 group-hover:text-[#FF7B00]",
      label: isActive ? "text-[#FF7B00]" : "text-gray-700 group-hover:text-[#FF7B00]",
      background: isActive 
        ? "bg-[#FFF5EB] border-l-4 border-[#FF7B00]" 
        : "hover:bg-[#FFF5EB] hover:border-l-4 hover:border-[#FFA652]"
    };
  };

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-16'} bg-[#FFFFFF] border-r border-gray-200 flex flex-col py-6 transition-all duration-300 ease-in-out`}>
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
      <div className="flex-1 flex flex-col items-center justify-center space-y-2 px-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const styles = getTabStyles(item.id);
          
          return (
            <button
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${isExpanded ? 'justify-start px-4' : 'justify-center'} py-3 rounded-lg transition-all duration-200 group ${styles.background}`}
            >
              <Icon className={`w-6 h-6 ${styles.icon} flex-shrink-0 transition-colors duration-200`} />
              {isExpanded && (
                <span className={`ml-4 whitespace-nowrap font-semibold ${styles.label} transition-colors duration-200`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Menu button at bottom */}
      <div className="flex justify-center mt-8 px-3">
        <button
          onClick={toggleSidebar}
          className={`w-full flex items-center ${isExpanded ? 'justify-start px-4' : 'justify-center'} py-3 rounded-lg hover:bg-[#FFF5EB] hover:border-l-4 hover:border-[#FFA652] transition-all duration-200 group`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-gray-500 group-hover:text-[#FF7B00] flex-shrink-0 transition-colors duration-200" />
          ) : (
            <Menu className="w-6 h-6 text-gray-500 group-hover:text-[#FF7B00] flex-shrink-0 transition-colors duration-200" />
          )}
          {isExpanded && (
            <span className="ml-4 text-gray-700 whitespace-nowrap font-semibold group-hover:text-[#FF7B00] transition-colors duration-200">
              Close Menu
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;