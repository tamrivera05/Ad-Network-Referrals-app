"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import DnsSetupGuide from "@/components/dashboard/documentation/DnsSetupGuide";

const DnsGuide = () => {
  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <DnsSetupGuide />
      </div>
    </div>
  );
};

export default DnsGuide;