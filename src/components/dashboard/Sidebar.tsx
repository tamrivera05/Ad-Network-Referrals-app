"use client";

import { Home, Search, Plus, Heart, User, Bookmark, Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-16 bg-[#FFFFFF] border-r border-[#FFCD90] flex flex-col items-center py-4 space-y-6">
      {/* Navigation Icons */}
      <div className="flex flex-col items-center space-y-6">
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Home className="w-6 h-6 text-[#FF8D21]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Search className="w-6 h-6 text-[#FF8D21]" />
        </button>
        <button className="p-3 rounded-full bg-[#FFF5EB]">
          <Plus className="w-6 h-6 text-[#FF7B00]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Heart className="w-6 h-6 text-[#FF8D21]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <User className="w-6 h-6 text-[#FF8D21]" />
        </button>
      </div>
      
      {/* Bottom Icons */}
      <div className="mt-auto flex flex-col items-center space-y-6">
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Bookmark className="w-6 h-6 text-[#FF8D21]" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#FFF5EB]">
          <Menu className="w-6 h-6 text-[#FF8D21]" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;