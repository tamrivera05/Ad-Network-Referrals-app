"use client";

import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DemographicsSection from "../components/dashboard/DemographicsSection";
import AnalyticsBar from "../components/dashboard/AnalyticsBar";
import GenderDistribution from "../components/dashboard/GenderDistribution";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-semibold text-gray-900">Insights</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Aug 26 – Sep 24</span>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Content */}
        <div className="max-w-2xl mx-auto">
          {/* Country Data */}
          <DemographicsSection title="Germany">
            <AnalyticsBar label="Germany" percentage="0.8%" value={8} />
          </DemographicsSection>

          {/* Age Demographics */}
          <DemographicsSection title="By age">
            {/* Filter Buttons */}
            <div className="flex space-x-2 mb-4">
              <button className="px-3 py-1 bg-black text-white text-sm rounded-full">All</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Female</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Male</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Other</button>
            </div>

            {/* Age Groups */}
            <AnalyticsBar label="13–17" percentage="2.3%" value={23} />
            <AnalyticsBar label="18–24" percentage="48.4%" value={484} />
            <AnalyticsBar label="25–34" percentage="43.2%" value={432} />
            <AnalyticsBar label="35–44" percentage="5.4%" value={54} />
            <AnalyticsBar label="45–54" percentage="0.5%" value={5} />
            <AnalyticsBar label="55–64" percentage="0.1%" value={1} />
            <AnalyticsBar label="65+" percentage="0.2%" value={2} />
          </DemographicsSection>

          {/* Gender Distribution */}
          <GenderDistribution 
            female="78.4%" 
            male="13.3%" 
            other="8.3%" 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;