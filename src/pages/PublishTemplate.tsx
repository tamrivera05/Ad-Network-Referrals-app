"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Globe, Link, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import Sidebar from "@/components/dashboard/Sidebar";

interface TemplateData {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
}

const PublishTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("templates");
  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAccountStatus, setUserAccountStatus] = useState<"approved" | "pending">("pending"); // Changed to pending for mock design
  
  // Form data
  const [smartlink, setSmartlink] = useState("");
  const [domainName, setDomainName] = useState("");

  useEffect(() => {
    // Get template data from navigation state
    if (location.state?.template) {
      setTemplate(location.state.template);
    } else {
      // If no template data, redirect back to templates
      navigate("/dashboard?tab=templates");
    }
  }, [location.state, navigate]);

  const totalSteps = userAccountStatus === "pending" ? 4 : 3;
  const progressPercentage = (step / totalSteps) * 100;

  const handleNext = async () => {
    if (step === 1 && !smartlink.trim()) {
      showError("Please enter your OGads smartlink");
      return;
    }
    
    if (step === 2 && !domainName.trim()) {
      showError("Please enter your domain name");
      return;
    }

    if (step === 2) {
      setIsLoading(true);
      // Simulate publishing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      showSuccess("Site published successfully!");
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      navigate(`/template/${template?.id}`);
    }
  };

  const handleFinish = () => {
    navigate("/dashboard?tab=sites");
  };

  if (!template) {
    return (
      <div className="flex h-screen bg-[#FFFFFF]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900">Template not found</h1>
              <button 
                onClick={() => navigate("/dashboard?tab=templates")}
                className="text-[#FF7B00] hover:underline mt-4 inline-block"
              >
                Back to Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <button 
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-[#FF7B00] transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold text-gray-900">Publish Template</h1>
              <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-2 bg-gray-200" />
            </div>
          </div>

          {/* Template Info with Screenshot */}
          <Card className="mb-6 border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Template Screenshot */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-36 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={template.images[0]} 
                      alt={`${template.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Template Details */}
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900 mb-2">{template.title}</CardTitle>
                  <CardDescription className="text-gray-600">{template.description}</CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {step === 1 && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Link className="w-5 h-5 text-[#FF7B00]" />
                    <span>Enter Your OGads Smartlink</span>
                  </CardTitle>
                  <CardDescription>
                    Provide the smartlink you received from OGads to connect your offers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smartlink" className="text-gray-700">OGads Smartlink</Label>
                    <Input
                      id="smartlink"
                      type="url"
                      placeholder="https://ogads.com/smartlink/..."
                      value={smartlink}
                      onChange={(e) => setSmartlink(e.target.value)}
                      className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                      required
                    />
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-700">
                      <span className="font-medium">Need help getting your smartlink?</span>
                      <a 
                        href="https://ogads.com/help/smartlink" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-600 hover:underline"
                      >
                        Learn how to get your OGads smartlink →
                      </a>
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={handleNext}
                    className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-[#FF7B00]" />
                    <span>Enter Your Domain Name</span>
                  </CardTitle>
                  <CardDescription>
                    Provide your custom domain where the site will be published
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain" className="text-gray-700">Domain Name</Label>
                    <Input
                      id="domain"
                      type="text"
                      placeholder="yourdomain.com"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                      required
                    />
                  </div>
                  
                  <Alert className="bg-green-50 border-green-200">
                    <ExternalLink className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      <span className="font-medium">Need help with DNS setup?</span>
                      <a 
                        href="https://help.cloudflare.com/dns-setup/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-1 text-green-600 hover:underline"
                      >
                        Learn how to set up DNS with Cloudflare, GoDaddy, and more →
                      </a>
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleNext}
                      className="flex-1 bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Publishing..." : "Publish Site"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-gray-200">
                <CardContent className="space-y-6 py-8">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Published Successfully!</h2>
                    <p className="text-gray-600 mb-6">
                      Your site is now live at <span className="font-semibold text-[#FF7B00]">https://{domainName}</span>
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Template:</span>
                      <span className="font-medium text-gray-900">{template.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Domain:</span>
                      <span className="font-medium text-gray-900">{domainName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Smartlink:</span>
                      <span className="font-medium text-gray-900 truncate max-w-xs">{smartlink}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    {userAccountStatus === "approved" && (
                      <Button 
                        onClick={handleFinish}
                        className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                      >
                        View My Sites
                      </Button>
                    )}
                    
                    {userAccountStatus === "pending" && (
                      <Button 
                        onClick={handleNext}
                        className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && userAccountStatus === "pending" && (
              <Card className="border-gray-200">
                <CardContent className="space-y-6 py-8">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Under Review</h2>
                    <p className="text-gray-600 mb-6">
                      Your site has been submitted and is pending approval
                    </p>
                  </div>
                  
                  <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-700">
                      <span className="font-medium">Important:</span> Your account is currently under review. 
                      Your site will be approved within <span className="font-bold">24-72 hours</span>. 
                      This is a one-time verification process. Once approved, your future sites will be published automatically without requiring approval.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Template:</span>
                      <span className="font-medium text-gray-900">{template.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Domain:</span>
                      <span className="font-medium text-gray-900">{domainName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-yellow-600">Pending Approval</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleFinish}
                    className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                  >
                    View My Sites
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishTemplate;