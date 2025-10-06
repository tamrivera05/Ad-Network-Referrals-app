"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TemplateCarousel from "./templates/TemplateCarousel";

const TemplatesSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // All available categories from templates
  const allCategories = [
    "Landing Pages",
    "Forms", 
    "Surveys",
    "Confirmation",
    "Events"
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="space-y-6">
      {/* Filter section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Filter dropdown */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={hasActiveFilters ? "default" : "outline"} 
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {hasActiveFilters && (
                  <span className="ml-1 bg-white bg-opacity-20 px-2 py-0.5 rounded text-xs">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <div className="p-2">
                <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                {allCategories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleCategoryToggle(category);
                    }}
                    className="flex items-center justify-between p-2 cursor-pointer"
                  >
                    <span className="text-sm">{category}</span>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedCategories.includes(category)
                        ? 'bg-[#FF7B00] border-[#FF7B00]'
                        : 'border-gray-300'
                    }`}>
                      {selectedCategories.includes(category) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              
              {/* Clear filters option */}
              {hasActiveFilters && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      clearFilters();
                    }}
                    className="flex items-center justify-center p-2 cursor-pointer text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    <span className="text-sm">Clear all filters</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Active filters display */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filters:</span>
              <div className="flex items-center space-x-2">
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-1 bg-[#FFF5EB] border border-[#FFA652] rounded-full px-3 py-1"
                  >
                    <span className="text-sm text-[#FF7B00]">{category}</span>
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="text-[#FF7B00] hover:text-[#FF8d21]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Template carousel with filters */}
      <TemplateCarousel selectedCategories={selectedCategories} />
    </div>
  );
};

export default TemplatesSection;