"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

const ServerError = () => {
  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full">
          <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
            {/* 500 Error Content */}
            <div className="text-center">
              {/* 500 Number Display */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="text-8xl md:text-9xl font-bold text-red-500 opacity-20">
                    500
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Something Went Wrong
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're sorry, but something unexpected happened on our end. 
                Our team has been notified and is working to fix this issue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;