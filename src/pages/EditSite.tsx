"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Globe, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import Sidebar from "@/components/dashboard/Sidebar";

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

const EditSite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [site, setSite] = useState<Site | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    url: "",
    offerLink: ""
  });
  const [unpublishDialogOpen, setUnpublishDialogOpen] = useState(false);
  const [unpublishConfirmName, setUnpublishConfirmName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get site data from navigation state
    if (location.state?.site) {
      setSite(location.state.site);
      setEditFormData({
        name: location.state.site.name,
        url: location.state.site.url,
        offerLink: location.state.site.offerLink
      });
    } else {
      // If no site data, redirect back to sites
      navigate("/dashboard?tab=sites");
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate("/dashboard?tab=sites");
  };

  const handleSaveChanges = async () => {
    if (!site) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the site data
    const updatedSite = { ...site, ...editFormData };
    setSite(updatedSite);
    
    showSuccess("Site updated successfully");
    setIsLoading(false);
  };

  const handleUnpublishClick = () => {
    setUnpublishDialogOpen(true);
    setUnpublishConfirmName("");
  };

  const handleUnpublishConfirm = async () => {
    if (!site || unpublishConfirmName !== site.name) {
      showError("Website name doesn't match. Please try again.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update site status to pending
    setSite(prev => prev ? { ...prev, status: "pending" as const } : null);
    
    showSuccess("Site unpublished successfully");
    setUnpublishDialogOpen(false);
    setUnpublishConfirmName("");
    setIsLoading(false);
  };

  const getStatusBadge = (status: Site["status"]) => {
    switch (status) {
      case "live":
        return (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Live
          </div>
        );
      case "pending":
        return (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Pending Publish
          </div>
        );
      case "error":
        return (
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </div>
        );
    }
  };

  const getStatusIcon = (status: Site["status"]) => {
    switch (status) {
      case "live":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (!site) {
    return (
      <div className="flex h-screen bg-[#FFFFFF]">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900">Site not found</h1>
              <button 
                onClick={handleBack}
                className="text-[#FF7B00] hover:underline mt-4 inline-block"
              >
                Back to My Sites
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
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
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
            
            <h1 className="text-lg font-semibold text-gray-900">Edit Site</h1>
          </div>

          {/* Site Info Card */}
          <Card className="mb-6 border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(site.status)}
                  <div>
                    <CardTitle className="text-xl text-gray-900">{editFormData.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      Template: {site.template}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(site.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{editFormData.url}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ExternalLink className="w-4 h-4" />
                <span>{editFormData.offerLink}</span>
              </div>
              <div className="text-sm text-gray-500">
                Published: {formatDate(site.publishDate)}
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Site Details</CardTitle>
              <CardDescription>
                Update your site information below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Website Name</Label>
                <Input
                  id="site-name"
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                  placeholder="Enter website name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="domain-name">Domain Name</Label>
                <Input
                  id="domain-name"
                  type="text"
                  value={editFormData.url}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="yourdomain.com"
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="offer-link">Offer Link</Label>
                <Input
                  id="offer-link"
                  type="url"
                  value={editFormData.offerLink}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, offerLink: e.target.value }))}
                  placeholder="https://ogads.com/offers/..."
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                />
              </div>

              {/* Error Message */}
              {site.status === "error" && site.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-700 font-medium">Error</p>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{site.errorMessage}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {site.status === "live" && (
                  <Button
                    variant="outline"
                    onClick={handleUnpublishClick}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    disabled={isLoading}
                  >
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                  disabled={isLoading || !editFormData.name.trim() || !editFormData.url.trim() || !editFormData.offerLink.trim()}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Unpublish Confirmation Dialog */}
      <Dialog open={unpublishDialogOpen} onOpenChange={setUnpublishDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Confirm Unpublish</DialogTitle>
            <DialogDescription>
              This action will unpublish your site. To confirm, please type the website name exactly as shown below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">Website Name:</p>
              <p className="text-sm text-gray-700 font-mono">{site?.name}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-name">Type website name to confirm</Label>
              <Input
                id="confirm-name"
                type="text"
                value={unpublishConfirmName}
                onChange={(e) => setUnpublishConfirmName(e.target.value)}
                placeholder="Enter website name"
                className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-3 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setUnpublishDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUnpublishConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading || unpublishConfirmName !== site?.name}
            >
              {isLoading ? "Unpublishing..." : "Unpublish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSite;