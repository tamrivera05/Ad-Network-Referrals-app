"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TemplateCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  isNew?: boolean;
}

const TemplateCard = ({ title, description, image, icon: Icon, isNew = false }: TemplateCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {isNew && (
        <div className="absolute top-3 left-3 bg-[#FF7B00] text-white text-xs font-medium px-2 py-1 rounded-md">
          New
        </div>
      )}
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4 pt-0">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Button className="w-full bg-[#FF7B00] hover:bg-[#FF8D21] text-white">
          Use Template
        </Button>
      </CardFooter>
    </div>
  );
};

export default TemplateCard;