"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import TemplatesSection from "../components/dashboard/TemplatesSection";
import Overview from "../components/dashboard/Overview";
import ProfileSection from "../components/dashboard/ProfileSection";
import MySitesSection from "../components/dashboard/MySitesSection";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const getPageTitle = () => {
    switch (activeTab) {
      case "home":
        return "Dashboard";
      case "templates":
        return "Templates";
      case "sites":
        return "My Sites";
      case "profile":
        return "Account";
      default:
        return "Dashboard";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Overview />;
      case "templates":
        return <TemplatesSection />;
      case "sites":
        return <MySitesSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your Dashboard</h2>
              <p className="text-gray-500">Your analytics and insights will appear here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
            </div>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;