"use client";

import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DemographicsSection from "../components/dashboard/DemographicsSection";
import AnalyticsBar from "../components/dashboard/AnalyticsBar";
import GenderDistribution from "../components/dashboard/GenderDistribution";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content - Empty */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-semibold text-[#FF7B00]">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#FFA652]">Aug 26 – Sep 24</span>
              <button className="p-1 rounded-full hover:bg-[#FFF5EB]">
                <svg className="w-5 h-5 text-[#FF8D21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Empty Content Area */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[#FFF5EB] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#FF7B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#FF7B00] mb-2">Welcome to your Dashboard</h2>
            <p className="text-[#FFA652]">Your analytics and insights will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;