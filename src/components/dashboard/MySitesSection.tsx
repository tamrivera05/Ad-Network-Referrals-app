"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Globe, AlertCircle, Clock, CheckCircle, XCircle, Settings, Copy, Link as LinkIcon } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useUserData } from "@/hooks/use-user-data";

interface Site {
  id: string;
  name: string;
  url: string;
  status: "live" | "pending" | "error";
  offerLink: string;
  publishDate: string;
  template: string;
  errorMessage?: string;
}

const MySitesSection = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [sites, setSites] = useState<Site[]>([
    {
      id: "1",
      name: "Summer Giveaway Landing",
      url: "https://summer-giveaway.example.com",
      status: "live",
      offerLink: "https://ogads.com/offers/summer123",
      publishDate: "2024-01-15",
      template: "CPA Landing Page"
    },
    {
      id: "2",
      name: "Mobile App Download",
      url: "https://app-download.example.com",
      status: "pending",
      offerLink: "https://ogads.com/offers/mobile456",
      publishDate: "2024-01-20",
      template: "Mobile App Landing"
    },
    {
      id: "3",
      name: "Email Capture Form",
      url: "https://email-capture.example.com",
      status: "error",
      offerLink: "https://ogads.com/offers/email789",
      publishDate: "2024-01-18",
      template: "Email Capture Form",
      errorMessage: "SSL Certificate Failed"
    },
    {
      id: "4",
      name: "Product Launch Page",
      url: "https://product-launch.example.com",
      status: "live",
      offerLink: "https://ogads.com/offers/product101",
      publishDate: "2024-01-22",
      template: "Product Launch"
    },
    {
      id: "5",
      name: "Survey Landing Page",
      url: "https://survey.example.com",
      status: "pending",
      offerLink: "https://ogads.com/offers/survey202",
      publishDate: "2024-01-25",
      template: "Survey Page"
    }
  ]);

  const getStatusIcon = (status: Site["status"], errorMessage?: string) => {
    switch (status) {
      case "live":
        return (
          <div className="group relative">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {/* Tooltip - positioned to the right for all screen sizes */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Live
            </div>
          </div>
        );
      case "pending":
        return (
          <div className="group relative">
            <Clock className="w-5 h-5 text-yellow-500" />
            {/* Tooltip - positioned to the right for all screen sizes with yellow background */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-yellow-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Pending Publish
            </div>
          </div>
        );
      case "error":
        return (
          <div className="group relative">
            <AlertCircle className="w-5 h-5 text-red-500" />
            {/* Tooltip - positioned to the right for all screen sizes */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              {errorMessage || "Error"}
            </div>
          </div>
        );
    }
  };

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccess("URL copied to clipboard!");
    } catch (err) {
      showError("Failed to copy URL");
    }
  };

  const handleEditSite = (site: Site) => {
    // Navigate to edit page with site data in state
    navigate(`/edit-site/${site.id}`, {
      state: { site }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Check if there are any pending sites
  const hasPendingSites = sites.some(site => site.status === "pending");

  return (
    <div className="space-y-6">
      {/* Conditional Banners */}
      {hasPendingSites && (
        <>
          {/* Banner for users who haven't set up OGads username */}
          {!userData.hasSetOgadsUsername && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <LinkIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800 mb-1">Verify Your OGads Username</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    To publish your websites, you need to set up your OGads username in your profile settings. This connects your smartlinks and enables earnings tracking.
                  </p>
                  <Button
                    onClick={() => navigate("/dashboard?tab=profile")}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    size="sm"
                  >
                    Set Up OGads Username
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Banner for users who have set up OGads username but account isn't approved */}
          {userData.hasSetOgadsUsername && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800 mb-1">Account Approval Pending</h3>
                  <p className="text-blue-700 text-sm">
                    Your websites will be published after your account is approved. This is a one-time verification process that typically takes 24-72 hours.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Page Description Only */}
      <p className="text-gray-600">Manage your published landing pages and monitor their status</p>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div key={site.id} className="relative h-full">
            {/* Status Icon positioned outside top left of card */}
            <div className="absolute -top-2 -left-2 z-10 bg-white rounded-full p-2 shadow-md">
              {getStatusIcon(site.status, site.errorMessage)}
            </div>
            
            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {site.name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                    onClick={() => handleEditSite(site)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-sm">
                  Template: {site.template}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* URL Display */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span className="truncate" title={site.url}>
                      {site.url}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ExternalLink className="w-4 h-4" />
                    <span className="truncate" title={site.offerLink}>
                      {site.offerLink}
                    </span>
                  </div>
                </div>

                {/* Publish Date */}
                <div className="text-sm text-gray-500">
                  Published: {formatDate(site.publishDate)}
                </div>

                {/* Copy URL Button - always part of card content */}
                <div className="flex justify-end">
                  {site.status === "live" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyUrl(site.url)}
                      className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="h-8 w-8"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySitesSection;