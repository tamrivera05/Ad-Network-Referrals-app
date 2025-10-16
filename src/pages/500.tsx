"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Home, RefreshCw, AlertTriangle, Mail, ExternalLink, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

const ServerError = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [hasReported, setHasReported] = useState(false);
  const navigate = useNavigate();

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    // Simulate retry attempt
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRetrying(false);
    
    // After retry, navigate to dashboard (in real app, this would check if the error is resolved)
    if (retryCount >= 2) {
      navigate("/dashboard?tab=home");
    }
  };

  const handleGoHome = () => {
    navigate("/dashboard?tab=home");
  };

  const handleReportError = () => {
    setHasReported(true);
    // In real app, this would send error report to monitoring service
    console.log("Error reported to support team");
  };

  const recoveryActions = [
    {
      title: "Refresh the Page",
      description: "Sometimes a simple refresh can resolve temporary issues",
      icon: RefreshCw,
      action: () => window.location.reload(),
      color: "bg-[#FFF5EB] hover:bg-[#FF8D21] hover:text-white"
    },
    {
      title: "Go to Dashboard",
      description: "Return to the main dashboard and try a different approach",
      icon: Home,
      action: handleGoHome,
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
          {/* 500 Error Content */}
          <div className="text-center py-12">
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
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're sorry, but something unexpected happened on our end. 
              Our team has been notified and is working to fix this issue.
            </p>

            {/* Error Status Alert */}
            <Alert className="bg-red-50 border-red-200 max-w-2xl mx-auto mb-8">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                <strong>Error ID:</strong> ERR-{Date.now().toString(36).toUpperCase()}<br />
                This error has been automatically logged for our technical team.
              </AlertDescription>
            </Alert>

            {/* Retry Section */}
            {retryCount < 3 && (
              <div className="mb-8">
                <Button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again ({3 - retryCount} attempts left)
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Recovery Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {recoveryActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Card 
                    key={index}
                    className={`border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${action.color}`}
                    onClick={action.action}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Report Error Section */}
            <Card className="border-gray-200 max-w-2xl mx-auto mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5 text-[#FF7B00]" />
                  <span>Need Additional Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  If the issue persists, please contact our support team with the error ID above.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleReportError}
                    disabled={hasReported}
                    className="border-[#FF7B00] text-[#FF7B00] hover:bg-[#FF7B00] hover:text-white"
                  >
                    {hasReported ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Reported
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Report Issue
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('mailto:support@gridtemplates.com?subject=Error%20Report%20-%20ERR-' + Date.now().toString(36).toUpperCase(), '_blank')}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="text-sm text-gray-500 max-w-2xl mx-auto">
              <p>
                We apologize for the inconvenience. Our technical team has been automatically notified 
                and is working to resolve this issue as quickly as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;