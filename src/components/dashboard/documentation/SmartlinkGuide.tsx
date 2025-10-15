"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

const SmartlinkGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the section from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const sectionParam = queryParams.get('section') || 'getting-started';

  const handleBack = () => {
    navigate("/dashboard?tab=resources");
  };

  const guideSections = {
    "getting-started": {
      title: "Getting Started with OGads Smartlinks",
      description: "Complete walkthrough on how to create and configure your first smartlink",
      difficulty: "Beginner",
      duration: "15 min read",
      content: [
        {
          title: "What is a Smartlink?",
          content: "A smartlink is a dynamic URL that automatically redirects users to the most relevant offers based on their location, device, and other parameters. This maximizes your conversion rates and earnings.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Smartlink+Overview"
        },
        {
          title: "Creating Your OGads Account",
          content: "Visit ogads.com and sign up for an account. You'll need to provide basic information and get approved before accessing smartlinks.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=OGads+Signup"
        },
        {
          title: "Navigating to Smartlinks Section",
          content: "Once logged in, go to the 'Tools' section and click on 'Smartlinks'. This is where you'll create and manage your smartlinks.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Smartlinks+Section"
        },
        {
          title: "Creating Your First Smartlink",
          content: "Click 'Create New Smartlink', give it a descriptive name, and select your target countries and device types.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Create+Smartlink"
        },
        {
          title: "Configuring Offer Settings",
          content: "Choose which offers to include, set rotation preferences, and configure fallback options for unsupported regions.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Offer+Settings"
        }
      ],
      tips: [
        "Start with a broad smartlink targeting multiple countries to maximize traffic",
        "Test different smartlink configurations to find what works best for your traffic",
        "Always use tracking parameters to monitor performance",
        "Keep your smartlinks updated with fresh offers for better conversions"
      ]
    },
    "best-practices": {
      title: "Smartlink Best Practices",
      description: "Optimize your smartlinks for maximum conversions and earnings",
      difficulty: "Intermediate",
      duration: "20 min read",
      content: [
        {
          title: "Traffic Source Optimization",
          content: "Different traffic sources perform differently with smartlinks. Analyze your traffic sources and create dedicated smartlinks for each.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Traffic+Analysis"
        },
        {
          title: "Geo-Targeting Strategies",
          content: "Focus on high-converting countries first, then expand to tier-2 and tier-3 countries as you gather data.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Geo+Targeting"
        },
        {
          title: "Device-Specific Optimization",
          content: "Create separate smartlinks for mobile and desktop traffic, as user behavior and conversion rates vary significantly.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Device+Optimization"
        },
        {
          title: "A/B Testing Your Smartlinks",
          content: "Test different offer selections, rotation methods, and landing pages to find the optimal configuration.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=A+B+Testing"
        },
        {
          title: "Seasonal Campaign Adjustments",
          content: "Adjust your smartlink configurations based on seasonal trends and holidays to maximize earnings.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Seasonal+Campaigns"
        }
      ],
      tips: [
        "Monitor your EPC (Earnings Per Click) to measure smartlink performance",
        "Use OGads' built-in analytics to identify top-performing offers",
        "Regularly update your smartlinks with new high-converting offers",
        "Implement traffic filtering to block low-quality traffic sources"
      ]
    },
    "analytics": {
      title: "Smartlink Analytics Dashboard",
      description: "How to track and analyze your smartlink performance",
      difficulty: "Intermediate",
      duration: "15 min read",
      content: [
        {
          title: "Understanding the Dashboard",
          content: "The OGads analytics dashboard provides real-time data on clicks, conversions, and earnings for all your smartlinks.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Analytics+Dashboard"
        },
        {
          title: "Key Metrics to Track",
          content: "Focus on CTR (Click-Through Rate), CR (Conversion Rate), EPC (Earnings Per Click), and total revenue.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Key+Metrics"
        },
        {
          title: "Geographic Performance Analysis",
          content: "Analyze which countries are generating the most revenue and optimize your targeting accordingly.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Geo+Performance"
        },
        {
          title: "Device Performance Tracking",
          content: "Monitor how different devices (mobile, desktop, tablet) are performing and adjust your strategies.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Device+Tracking"
        },
        {
          title: "Time-Based Analysis",
          content: "Identify peak performance times and days to optimize your campaign schedules.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Time+Analysis"
        }
      ],
      tips: [
        "Set up custom date ranges to compare performance over time",
        "Export analytics data for deeper analysis in spreadsheet software",
        "Create automated reports to track long-term trends",
        "Use sub-IDs to track performance of individual traffic sources"
      ]
    },
    "troubleshooting": {
      title: "Troubleshooting Smartlink Issues",
      description: "Common problems and solutions for OGads smartlink setup",
      difficulty: "Advanced",
      duration: "10 min read",
      content: [
        {
          title: "Low Conversion Rates",
          content: "If your smartlinks aren't converting, check your traffic quality, offer selection, and targeting settings.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Low+Conversions"
        },
        {
          title: "Smartlink Not Working",
          content: "Verify your smartlink URL is correct and that you have active offers in your configuration.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Broken+Smartlink"
        },
        {
          title: "Payment Issues",
          content: "Ensure your payment information is up to date and that you've met the minimum payout threshold.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Payment+Issues"
        },
        {
          title: "Traffic Quality Warnings",
          content: "If you receive warnings about traffic quality, review your promotion methods and ensure compliance.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Traffic+Quality"
        },
        {
          title: "Account Suspension",
          content: "Understand common reasons for account suspension and how to appeal or prevent issues.",
          image: "https://placehold.co/600x400/f3f4f6/333333?text=Account+Issues"
        }
      ],
      tips: [
        "Always test your smartlinks before sending large amounts of traffic",
        "Keep backup smartlinks ready in case of technical issues",
        "Document your smartlink configurations for easy troubleshooting",
        "Stay updated with OGads terms of service to avoid compliance issues"
      ]
    }
  };

  const currentSection = guideSections[sectionParam as keyof typeof guideSections];

  if (!currentSection) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Smartlink Guide Section Not Found</h1>
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">OGads Smartlink Guide</h1>
        <p className="text-gray-600">
          Master the art of creating and optimizing smartlinks for maximum earnings
        </p>
      </div>

      {/* Section Info */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900">{currentSection.title}</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                {currentSection.description}
              </CardDescription>
            </div>
            <div className="flex flex-row md:flex-col items-start space-y-2 md:space-y-4">
              <div className="flex flex-row items-center space-x-2 text-sm">
                <span className={`px-2 py-1 rounded-full font-medium ${
                  currentSection.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  currentSection.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentSection.difficulty}
                </span>
                <span className="text-gray-500">{currentSection.duration}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content Sections */}
      <div className="space-y-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Step-by-Step Instructions</h2>
        
        {currentSection.content.map((content, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF7B00] text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <span className="text-lg">{content.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{content.content}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <img 
                  src={content.image} 
                  alt={content.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Key Tips</h2>
        <div className="grid gap-4">
          {currentSection.tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-[#FFF5EB] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#FF7B00] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* External Resources */}
      <Card className="border-gray-200 mt-6">
        <CardHeader>
          <CardTitle>External Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline"
            onClick={() => window.open('https://ogads.com/help/smartlink', '_blank')}
            className="text-[#FF7B00] border-[#FF7B00] hover:bg-[#FFF5EB] w-full sm:w-auto"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            OGads Official Smartlink Guide
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.open('https://ogads.com/support', '_blank')}
            className="text-[#FF7B00] border-[#FF7B00] hover:bg-[#FFF5EB] w-full sm:w-auto"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Contact OGads Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartlinkGuide;