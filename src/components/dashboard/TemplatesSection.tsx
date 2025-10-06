"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TemplateCarousel from "./templates/TemplateCarousel";

const TemplatesSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const clearSearch = () => {
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Filter and Search section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        {/* Left side: Filter button and active filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 w-full sm:w-auto">
          {/* Filter button at the start */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={hasActiveFilters ? "default" : "outline"} 
                className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {selectedCategories.length > 0 && (
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
              {selectedCategories.length > 0 && (
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

          {/* Active filters display beside filter button */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-2">
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
              {searchQuery && (
                <div
                  className="flex items-center space-x-1 bg-[#FFF5EB] border border-[#FFA652] rounded-full px-3 py-1"
                >
                  <span className="text-sm text-[#FF7B00]">Search: "{searchQuery}"</span>
                  <button
                    onClick={clearSearch}
                    className="text-[#FF7B00] hover:text-[#FF8d21]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search bar at the end */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 w-full sm:w-64 border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Template carousel with filters and search */}
      <TemplateCarousel selectedCategories={selectedCategories} searchQuery={searchQuery} />
    </div>
  );
};

export default TemplatesSection;