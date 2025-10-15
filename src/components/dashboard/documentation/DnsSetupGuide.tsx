"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ExternalLink, CheckCircle, AlertCircle, Clock } from "lucide-react";

const DnsSetupGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the provider from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const providerParam = queryParams.get('provider') || 'cloudflare';
  
  const handleBack = () => {
    navigate("/dashboard?tab=resources");
  };

  const dnsProviders = {
    cloudflare: {
      title: "Cloudflare DNS Setup",
      description: "Complete guide to setting up DNS records in Cloudflare",
      difficulty: "Beginner",
      duration: "10 min read",
      steps: [
        {
          title: "Step 1: Log in to Cloudflare",
          content: "Navigate to cloudflare.com and log in to your account. If you don't have an account, create one for free.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Cloudflare+Login"
        },
        {
          title: "Step 2: Add Your Domain",
          content: "Click 'Add a site' and enter your domain name. Select the free plan and continue.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Add+Domain"
        },
        {
          title: "Step 3: Update Nameservers",
          content: "Cloudflare will provide you with nameservers. Update these at your domain registrar.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Nameservers"
        },
        {
          title: "Step 4: Add DNS Records",
          content: "Navigate to DNS section and add A record pointing to your server IP address.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=DNS+Records"
        },
        {
          title: "Step 5: Verify DNS Propagation",
          content: "Wait for DNS propagation (usually 5-30 minutes) and verify your domain is working.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Verification"
        }
      ],
      tips: [
        "Always use Cloudflare's free SSL certificate for better security",
        "Enable Cloudflare's caching features for faster load times",
        "Set up page rules to redirect non-www to www versions",
        "Monitor DNS propagation using online tools like whatsmydns.net"
      ]
    },
    godaddy: {
      title: "GoDaddy DNS Configuration",
      description: "Step-by-step tutorial for configuring DNS settings in GoDaddy",
      difficulty: "Beginner",
      duration: "8 min read",
      steps: [
        {
          title: "Step 1: Access DNS Management",
          content: "Log in to your GoDaddy account, go to 'My Products', find your domain, and click 'DNS'.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=GoDaddy+DNS"
        },
        {
          title: "Step 2: Add A Record",
          content: "Click 'Add' under 'Records', select 'A' as the type, enter '@' as the name, and your server IP as the value.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=A+Record"
        },
        {
          title: "Step 3: Configure CNAME",
          content: "Add a CNAME record for 'www' pointing to your main domain (@).",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=CNAME+Record"
        },
        {
          title: "Step 4: Save Changes",
          content: "Click 'Save' and wait for DNS propagation to complete.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Save+Changes"
        }
      ],
      tips: [
        "GoDaddy DNS changes can take up to 48 hours to propagate",
        "Use GoDaddy's DNS check tool to verify your settings",
        "Consider upgrading to GoDaddy's premium DNS for better performance",
        "Keep a backup of your DNS settings before making changes"
      ]
    },
    namecheap: {
      title: "Namecheap DNS Management",
      description: "How to manage DNS records and point your domain to our servers",
      difficulty: "Beginner",
      duration: "12 min read",
      steps: [
        {
          title: "Step 1: Navigate to Domain List",
          content: "Log in to Namecheap, go to 'Domain List', and click 'Manage' next to your domain.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Namecheap+Domains"
        },
        {
          title: "Step 2: Access Advanced DNS",
          content: "Scroll down to 'Advanced DNS' section and click 'Add New Record'.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Advanced+DNS"
        },
        {
          title: "Step 3: Configure A Record",
          content: "Select 'A Record', type '@' as host, enter your server IP, and set TTL to 'Automatic'.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=A+Record+Setup"
        },
        {
          title: "Step 4: Add WWW Record",
          content: "Add another A record with 'www' as host pointing to the same IP address.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=WWW+Record"
        },
        {
          title: "Step 5: Save and Verify",
          content: "Click the checkmark to save changes and wait for propagation.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Save+Verify"
        }
      ],
      tips: [
        "Namecheap offers free DNS for all domains registered with them",
        "Use their 'Dynamic DNS' feature if you have a dynamic IP address",
        "Enable 'URL Forwarding' if you want to redirect to another domain",
        "Check for conflicting records before adding new ones"
      ]
    }
  };

  const currentProvider = dnsProviders[providerParam as keyof typeof dnsProviders];

  if (!currentProvider) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">DNS Provider Not Found</h1>
          <button 
            onClick={handleBack}
            className="text-[#FF7B00] hover:underline mt-4 inline-block"
          >
            Back to Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-[#FF7B00] transition-colors mr-4"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Resources
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DNS Setup Guide</h1>
        <p className="text-gray-600">
          Learn how to configure DNS settings for your domain across different providers
        </p>
      </div>

      {/* Provider Info */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900">{currentProvider.title}</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                {currentProvider.description}
              </CardDescription>
            </div>
            <div className="flex flex-row md:flex-col items-start space-y-2 md:space-y-4">
              <div className="flex flex-row items-center space-x-2 text-sm">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {currentProvider.difficulty}
                </span>
                <span className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentProvider.duration}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step-by-Step Guide */}
      <div className="space-y-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Step-by-Step Instructions</h2>
        
        {currentProvider.steps.map((step, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF7B00] text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <span className="text-lg">{step.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{step.content}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Tips & Best Practices</h2>
        <div className="grid gap-4">
          {currentProvider.tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-[#FFF5EB] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#FF7B00] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <Card className="border-gray-200 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span>Troubleshooting</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900">DNS not propagating?</h4>
              <p className="text-gray-600">DNS changes can take anywhere from 5 minutes to 48 hours to fully propagate worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Site not loading?</h4>
              <p className="text-gray-600">Check if your A record is pointing to the correct IP address and verify your server is running.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">SSL certificate issues?</h4>
              <p className="text-gray-600">Ensure SSL is properly configured and your domain is fully propagated before enabling HTTPS.</p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="outline"
              onClick={() => window.open('https://www.whatsmydns.net/', '_blank')}
              className="text-[#FF7B00] border-[#FF7B00] hover:bg-[#FFF5EB]"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Check DNS Propagation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DnsSetupGuide;