"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Layout, User, Menu, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (tabId: string) => {
    if (tabId === "account") {
      // Navigate to the Account page route
      navigate("/account");
    } else {
      // Handle dashboard tabs
      setActiveTab(tabId);
      // Navigate to dashboard with tab parameter
      navigate(`/dashboard?tab=${tabId}`);
    }
  };

  const menuItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Layout, label: "Templates", id: "templates" },
    { icon: User, label: "Account", id: "account" },
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
    <>
      {/* Mobile Top Bar with centered full logo and burger icon beside it */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 mb-4">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left spacer */}
          <div className="w-10"></div>
          
          {/* Centered Full Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#FF7B00] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="ml-3 text-xl font-bold text-[#FF7B00]">
              GridTemplates
            </span>
          </div>
          
          {/* Burger icon on the right */}
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-[#FFF5EB] hover:border-[#FFA652] transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-gray-700 hover:text-[#FF7B00]" />
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Navigation Overlay */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
        isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isExpanded ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={toggleSidebar}
        />
        
        {/* Full-Screen Navigation Content */}
        <div className={`absolute inset-0 bg-white transition-transform duration-300 transform ${
          isExpanded ? 'translate-y-0' : '-translate-y-full'
        }`}>
          {/* Header with Logo and Close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#FF7B00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="ml-3 text-xl font-bold text-[#FF7B00]">
                GridTemplates
              </span>
            </div>
            
            {/* Close button */}
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-[#FFF5EB] hover:border-[#FFA652] transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-700 hover:text-[#FF7B00]" />
            </button>
          </div>
          
          {/* Navigation Items - Top aligned with mobile-appropriate sizing */}
          <div className="flex flex-col px-6 py-8 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleNavigation(item.id);
                    toggleSidebar(); // Close sidebar after navigation on mobile
                  }}
                  className={`w-full flex items-center px-4 py-4 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[#FFF5EB] border-l-4 border-[#FF7B00]' 
                      : 'hover:bg-[#FFF5EB] hover:border-l-4 hover:border-[#FFA652]'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-[#FF7B00]' : 'text-gray-500 group-hover:text-[#FF7B00]'
                  }`} />
                  <span className={`ml-4 whitespace-nowrap font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#FF7B00]' : 'text-gray-700 group-hover:text-[#FF7B00]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Original design for md and larger screens */}
      <div className={`hidden md:flex ${isExpanded ? 'w-64' : 'w-16'} bg-[#FFFFFF] border-r border-gray-200 flex flex-col py-6 transition-all duration-300 ease-in-out`}>
        {/* Logo and App Name */}
        <div className="flex items-center justify-center mb-8 px-4">
          <div className="w-10 h-10 bg-[#FF7B00] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          {isExpanded && (
            <span className="ml-3 text-xl font-bold text-[#FF7B00] whitespace-nowrap">
              GridTemplates
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
                onClick={() => handleNavigation(item.id)}
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
    </>
  );
};

export default Sidebar;