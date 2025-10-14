"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import SmartlinkGuide from "@/components/dashboard/documentation/SmartlinkGuide";

const SmartlinkGuide = () => {
  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <SmartlinkGuide />
      </div>
    </div>
  );
};

export default SmartlinkGuide;