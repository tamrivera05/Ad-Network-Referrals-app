"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "../components/dashboard/Overview";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
              <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your account.</p>
            </div>

            {/* Overview Content */}
            <div className="space-y-6">
              <Overview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;