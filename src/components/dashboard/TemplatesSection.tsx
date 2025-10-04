"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import TemplateCarousel from "./templates/TemplateCarousel";

const TemplatesSection = () => {
  const [activeTab, setActiveTab] = useState("latest");

  return (
    <div className="space-y-6">
      {/* Tab navigation without card wrapper */}
      <div className="flex items-center justify-between">
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
      </div>
      
      {/* Template carousel without card wrapper */}
      <TemplateCarousel />
    </div>
  );
};

export default TemplatesSection;