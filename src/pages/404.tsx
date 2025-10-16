"use client";

import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard?tab=home");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full">
          <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
            {/* 404 Error Content */}
            <div className="text-center">
              {/* 404 Number Display */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="text-8xl md:text-9xl font-bold text-[#FF7B00] opacity-20">
                    404
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FF7B00] rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Oops! The page you're looking for doesn't exist or has been moved. 
                Don't worry, let's get you back on track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;