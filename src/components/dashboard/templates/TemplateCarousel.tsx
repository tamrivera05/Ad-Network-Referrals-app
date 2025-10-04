"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemplateCard from "./TemplateCard"; // Fixed import path

const TemplateCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const templates = [
    {
      id: 1,
      title: "CPA Landing Page",
      description: "High-converting landing page for CPA offers",
      image: "https://placehold.co/600x400/e5f3ff/333333?text=CPA+Landing+Page",
      icon: ArrowRight
    },
    {
      id: 2,
      title: "Email Capture Form",
      description: "Optimized form for email collection",
      image: "https://placehold.co/600x400/e5f3ff/333333?text=Email+Capture+Form",
      icon: ArrowRight,
      isNew: true
    },
    {
      id: 3,
      title: "Survey Page",
      description: "Interactive survey for lead generation",
      image: "https://placehold.co/600x400/e5f3ff/333333?text=Survey+Page",
      icon: ArrowRight
    },
    {
      id: 4,
      title: "Video Landing Page",
      description: "Engaging video-based landing page",
      image: "https://placehold.co/600x400/e5f3ff/333333?text=Video+Landing+Page",
      icon: ArrowRight
    },
    {
      id: 5,
      title: "Mobile App Landing",
      description: "Mobile-optimized landing page",
      image: "https://placehold.co/600x400/e5f3ff/333333?text=Mobile+App+Landing",
      icon: ArrowRight
    },
    {
      id: 6,
      title: "Thank You Page",
      description: "Confirmation page for conversions",
      image: "https://placehold.co/600x400/e5f3ff/333333?text=Thank+You+Page",
      icon: ArrowRight
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % templates.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + templates.length) % templates.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const visibleTemplates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(templates[(currentIndex + i) % templates.length]);
    }
    return result;
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Templates</h2>
          <p className="text-sm text-gray-600">Choose from our pre-built templates</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleTemplates().map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              description={template.description}
              image={template.image}
              icon={template.icon}
              isNew={template.new}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCarousel;