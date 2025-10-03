"use client";

import { Home, Search, Plus, Heart, User, Bookmark, Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-16 bg-white border-r border-gray-100 flex flex-col items-center py-4 space-y-6">
      {/* Navigation Icons */}
      <div className="flex flex-col items-center space-y-6">
        <button className="p-3 rounded-full hover:bg-gray-100">
          <Home className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100">
          <Search className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-3 rounded-full bg-gray-100">
          <Plus className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100">
          <Heart className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      {/* Bottom Icons */}
      <div className="mt-auto flex flex-col items-center space-y-6">
        <button className="p-3 rounded-full hover:bg-gray-100">
          <Bookmark className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;