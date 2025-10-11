"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Eye, Globe, AlertCircle, Clock, CheckCircle, XCircle, Settings } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

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

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [unpublishDialogOpen, setUnpublishDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    url: "",
    offerLink: ""
  });
  const [unpublishConfirmName, setUnpublishConfirmName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStatusBadge = (status: Site["status"]) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Live
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending Publish
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
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

  const handleViewLive = (url: string) => {
    window.open(url, "_blank");
  };

  const handleEditSite = (site: Site) => {
    setSelectedSite(site);
    setEditFormData({
      name: site.name,
      url: site.url,
      offerLink: site.offerLink
    });
    setEditDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedSite) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSites(prev => prev.map(site => 
      site.id === selectedSite.id 
        ? { ...site, ...editFormData }
        : site
    ));
    
    showSuccess("Site updated successfully");
    setEditDialogOpen(false);
    setSelectedSite(null);
    setEditFormData({ name: "", url: "", offerLink: "" });
    setIsLoading(false);
  };

  const handleUnpublishClick = () => {
    setEditDialogOpen(false);
    setUnpublishDialogOpen(true);
    setUnpublishConfirmName("");
  };

  const handleUnpublishConfirm = async () => {
    if (!selectedSite || unpublishConfirmName !== selectedSite.name) {
      showError("Website name doesn't match. Please try again.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSites(prev => prev.map(site => 
      site.id === selectedSite.id 
        ? { ...site, status: "pending" as const }
        : site
    ));
    
    showSuccess("Site unpublished successfully");
    setUnpublishDialogOpen(false);
    setSelectedSite(null);
    setUnpublishConfirmName("");
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Sites</h2>
        <p className="text-gray-600">Manage your published landing pages and monitor their status</p>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(site.status)}
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {site.name}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(site.status)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                    onClick={() => handleEditSite(site)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
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

              {/* Error Message */}
              {site.status === "error" && site.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{site.errorMessage}</p>
                </div>
              )}

              {/* Publish Date */}
              <div className="text-sm text-gray-500">
                Published: {formatDate(site.publishDate)}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                {site.status === "live" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewLive(site.url)}
                    className="w-full justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Site Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Site</DialogTitle>
            <DialogDescription>
              Update the details for {selectedSite?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Website Name</Label>
              <Input
                id="site-name"
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
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
          </div>
          
          <DialogFooter className="gap-3 sm:gap-2">
            {selectedSite?.status === "live" && (
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
              onClick={() => setEditDialogOpen(false)}
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <p className="text-sm text-gray-700 font-mono">{selectedSite?.name}</p>
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
              disabled={isLoading || unpublishConfirmName !== selectedSite?.name}
            >
              {isLoading ? "Unpublishing..." : "Unpublish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySitesSection;