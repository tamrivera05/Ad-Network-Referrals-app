"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Link, BookOpen, Video, FileText } from "lucide-react";

const ResourcesSection = () => {
  const dnsResources = [
    {
      title: "Cloudflare DNS Setup",
      description: "Complete guide to setting up DNS records in Cloudflare for your domains",
      type: "guide",
      url: "https://help.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare",
      difficulty: "Beginner",
      duration: "10 min read"
    },
    {
      title: "GoDaddy DNS Configuration",
      description: "Step-by-step tutorial for configuring DNS settings in GoDaddy",
      type: "guide",
      url: "https://www.godaddy.com/help/manage-dns-records-680",
      difficulty: "Beginner",
      duration: "8 min read"
    },
    {
      title: "Namecheap DNS Management",
      description: "How to manage DNS records and point your domain to our servers",
      type: "guide",
      url: "https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-to-manage-dns-records/",
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
      url: "https://ogads.com/help/smartlink",
      difficulty: "Beginner",
      duration: "15 min video"
    },
    {
      title: "OGads Smartlink Best Practices",
      description: "Optimize your smartlinks for maximum conversions and earnings",
      type: "guide",
      url: "https://ogads.com/help/smartlink-best-practices",
      difficulty: "Intermediate",
      duration: "20 min read"
    },
    {
      title: "Smartlink Analytics Dashboard",
      description: "How to track and analyze your smartlink performance",
      type: "guide",
      url: "https://ogads.com/help/analytics",
      difficulty: "Intermediate",
      duration: "15 min read"
    },
    {
      title: "Troubleshooting Smartlink Issues",
      description: "Common problems and solutions for OGads smartlink setup",
      type: "article",
      url: "https://ogads.com/help/troubleshooting",
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

  const ResourceCard = ({ resource, category }: { resource: any, category: string }) => (
    <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getTypeIcon(resource.type)}
              <span className="text-xs font-medium text-gray-500 uppercase">{resource.type}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{resource.duration}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(resource.url, '_blank')}
            className="text-[#FF7B00] border-[#FF7B00] hover:bg-[#FFF5EB] hover:text-[#FF8d21] group-hover:scale-105 transition-all duration-200"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resources</h2>
        <p className="text-gray-600">Learn how to set up your domains and configure OGads smartlinks with our comprehensive guides and tutorials.</p>
      </div>

      {/* DNS Setup Resources */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 text-[#FF7B00]" />
          <h3 className="text-xl font-bold text-gray-900">DNS Setup Guides</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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