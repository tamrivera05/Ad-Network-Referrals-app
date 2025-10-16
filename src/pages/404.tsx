"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard?tab=home");
  };

  const handleBrowseTemplates = () => {
    navigate("/dashboard?tab=templates");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const quickLinks = [
    {
      title: "Dashboard",
      description: "Return to your main dashboard",
      icon: Home,
      action: () => navigate("/dashboard?tab=home"),
      color: "bg-[#FFF5EB] hover:bg-[#FF8D21] hover:text-white"
    },
    {
      title: "Browse Templates",
      description: "Explore our template collection",
      icon: Search,
      action: () => navigate("/dashboard?tab=templates"),
      color: "bg-[#FFF8F0] hover:bg-[#FFA652] hover:text-white"
    }
  ];

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
          {/* 404 Error Content */}
          <div className="text-center py-12">
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
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={handleGoHome}
                className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white px-6 py-3"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleGoBack}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Quick Links Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Card 
                    key={index}
                    className={`border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${link.color}`}
                    onClick={link.action}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-[#FF7B00]" />
                      </div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Help Section */}
            <div className="mt-12 p-6 bg-[#FFF5EB] rounded-xl border border-[#FFA652] max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-[#FF7B00] mb-3">
                Still Can't Find What You're Looking For?
              </h3>
              <p className="text-gray-700 mb-4">
                If you believe this is an error or need assistance finding something, 
                our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.open('mailto:support@gridtemplates.com', '_blank')}
                  className="border-[#FF7B00] text-[#FF7B00] hover:bg-[#FF7B00] hover:text-white"
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://discord.gg/gridtemplates', '_blank')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;