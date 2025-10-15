"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Link, BookOpen, Video, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResourcesSection = () => {
  const navigate = useNavigate();

  const dnsResources = [
    {
      title: "Cloudflare DNS Setup",
      description: "Complete guide to setting up DNS records in Cloudflare for your domains",
      type: "guide",
      url: "/dns-guide?provider=cloudflare",
      difficulty: "Beginner",
      duration: "10 min read"
    },
    {
      title: "GoDaddy DNS Configuration",
      description: "Step-by-step tutorial for configuring DNS settings in GoDaddy",
      type: "guide",
      url: "/dns-guide?provider=godaddy",
      difficulty: "Beginner",
      duration: "8 min read"
    },
    {
      title: "Namecheap DNS Management",
      description: "How to manage DNS records and point your domain to our servers",
      type: "guide",
      url: "/dns-guide?provider=namecheap",
      difficulty: "Beginner",
      duration: "12 min read"
    },
    {
      title: "DNS Propagation Explained",
      description: "Understanding why DNS changes take time and how to check propagation",
      type: "article",
      url: "https://www.cloudflare.com/learning/dns/what-is-dns-propagation/",
      difficulty: "Intermediate",
      duration: "5 min read"
    }
  ];

  const smartlinkResources = [
    {
      title: "Getting Started with OGads Smartlinks",
      description: "Complete walkthrough on how to create and configure your first smartlink",
      type: "video",
      url: "/smartlink-guide?section=getting-started",
      difficulty: "Beginner",
      duration: "15 min video"
    },
    {
      title: "OGads Smartlink Best Practices",
      description: "Optimize your smartlinks for maximum conversions and earnings",
      type: "guide",
      url: "/smartlink-guide?section=best-practices",
      difficulty: "Intermediate",
      duration: "20 min read"
    },
    {
      title: "Smartlink Analytics Dashboard",
      description: "How to track and analyze your smartlink performance",
      type: "guide",
      url: "/smartlink-guide?section=analytics",
      difficulty: "Intermediate",
      duration: "15 min read"
    },
    {
      title: "Troubleshooting Smartlink Issues",
      description: "Common problems and solutions for OGads smartlink setup",
      type: "article",
      url: "/smartlink-guide?section=troubleshooting",
      difficulty: "Advanced",
      duration: "10 min read"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-purple-500" />;
      case "guide":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "article":
        return <FileText className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleResourceClick = (url: string) => {
    if (url.startsWith('/')) {
      navigate(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const ResourceCard = ({ resource, category }: { resource: any, category: string }) => (
    <Card 
      className="border-gray-200 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
      onClick={() => handleResourceClick(resource.url)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getTypeIcon(resource.type)}
              <span className="text-xs font-medium text-gray-500 uppercase">{resource.type}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
              {!resource.url.startsWith('/') && (
                <ExternalLink className="w-3 h-3 text-gray-400" />
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-[#FF7B00] transition-colors line-clamp-2">
              {resource.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">
          {resource.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center">
          <span className="text-xs text-gray-500">{resource.duration}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Page Description Only */}
      <p className="text-gray-600">Learn how to set up your domains and configure OGads smartlinks with our comprehensive guides and tutorials.</p>

      {/* DNS Setup Resources */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 text-[#FF7B00]" />
          <h3 className="text-xl font-bold text-gray-900">DNS Setup Guides</h3>
        </div>
        <div className="space-y-4">
          {dnsResources.map((resource, index) => (
            <ResourceCard key={`dns-${index}`} resource={resource} category="dns" />
          ))}
        </div>
      </div>

      {/* Smartlink Resources */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Link className="w-6 h-6 text-[#FF7B00]" />
          <h3 className="text-xl font-bold text-gray-900">OGads Smartlink Guides</h3>
        </div>
        <div className="space-y-4">
          {smartlinkResources.map((resource, index) => (
            <ResourceCard key={`smartlink-${index}`} resource={resource} category="smartlink" />
          ))}
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="bg-[#FFF5EB] rounded-xl p-6 border border-[#FFA652]">
        <h3 className="text-lg font-bold text-[#FF7B00] mb-3">Need Additional Help?</h3>
        <p className="text-gray-700 mb-4">
          Can't find what you're looking for? Our support team is here to help you with any questions about DNS setup or smartlink configuration.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="border-[#FF7B00] text-[#FF7B00] hover:bg-[#FF7B00] hover:text-white"
            onClick={() => window.open('https://ogads.com/support', '_blank')}
          >
            Contact OGads Support
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => window.open('https://discord.gg/gridtemplates', '_blank')}
          >
            Join Community Discord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;