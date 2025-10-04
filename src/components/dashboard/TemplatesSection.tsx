"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";
import TemplateCarousel from "./templates/TemplateCarousel"; // Fixed import path

const TemplatesSection = () => {
  const [activeTab, setActiveTab] = useState("latest");

  return (
    <div className="space-y-6">
      <Card className="border-gray-200">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Templates</CardTitle>
            <span className="text-sm text-gray-500">4 of 24</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={activeTab === "latest" ? "default" : "outline"} 
              onClick={() => setActiveTab("latest")}
              className="text-sm"
            >
              Latest
            </Button>
            <Button 
              variant={activeTab === "popular" ? "default" : "outline"} 
              onClick={() => setActiveTab("popular")}
              className="text-sm"
            >
              Most popular
            </Button>
            <Button 
              variant={activeTab === "top" ? "default" : "outline"} 
              onClick={() => setActiveTab("top")}
              className="text-sm"
            >
              Top rated
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TemplateCarousel />
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesSection;