"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Edit, Eye, EyeOff, Globe, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
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
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [newOfferLink, setNewOfferLink] = useState("");
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

  const handleEditOfferLink = (site: Site) => {
    setSelectedSite(site);
    setNewOfferLink(site.offerLink);
    setEditDialogOpen(true);
  };

  const handleSaveOfferLink = async () => {
    if (!selectedSite) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSites(prev => prev.map(site => 
      site.id === selectedSite.id 
        ? { ...site, offerLink: newOfferLink }
        : site
    ));
    
    showSuccess("Offer link updated successfully");
    setEditDialogOpen(false);
    setSelectedSite(null);
    setNewOfferLink("");
    setIsLoading(false);
  };

  const handleUnpublish = async (siteId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSites(prev => prev.map(site => 
      site.id === siteId 
        ? { ...site, status: "pending" as const }
        : site
    ));
    
    showSuccess("Site unpublished successfully");
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
                {getStatusBadge(site.status)}
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
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditOfferLink(site)}
                  className="w-full justify-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Offer Link
                </Button>
                
                {site.status === "live" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnpublish(site.id)}
                    className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50"
                    disabled={isLoading}
                  >
                    <EyeOff className="w-4 h-4 mr-2" />
                    Unpublish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Offer Link Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Offer Link</DialogTitle>
            <DialogDescription>
              Update the offer link for {selectedSite?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="offer-link">Offer Link</Label>
              <Input
                id="offer-link"
                type="url"
                value={newOfferLink}
                onChange={(e) => setNewOfferLink(e.target.value)}
                placeholder="https://ogads.com/offers/..."
                className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveOfferLink}
              className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
              disabled={isLoading || !newOfferLink.trim()}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySitesSection;