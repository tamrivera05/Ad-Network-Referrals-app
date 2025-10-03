"use client";

import { Home, Search, Plus, Heart, User, Bookmark, Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-16 bg-[#FFFFFF] border-r border-gray-200 flex flex-col py-4">
      {/* Logo at top */}
      <div className="flex justify-center mb-8">
        <div className="w-10 h-10 bg-[#FF7B00] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
      </div>
      
      {/* Navigation Icons - Vertically Centered */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Home className="w-6 h-6 text-[#FF8D21]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Search className="w-6 h-6 text-[#FFA652]" />
        </button>
        <button className="p-3 rounded-full bg-[#FFF5EB]">
          <Plus className="w-6 h-6 text-[#FF7B00]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Heart className="w-6 h-6 text-[#FFB76B]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <User className="w-6 h-6 text-[#FFCD90]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Bookmark className="w-6 h-6 text-[#FFA652]" />
        </button>
      </div>
      
      {/* Menu button at bottom */}
      <div className="flex justify-center mt-8">
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Menu className="w-6 h-6 text-[#FF8D21]" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;