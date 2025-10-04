"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TemplateCardProps {
  title: string;
  description: string;
  images: string[];
  isNew?: boolean;
}

const TemplateCard = ({ title, description, images, isNew = false }: TemplateCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Card with carousel inside */}
      <div className="relative group rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md">
        {/* Image carousel */}
        <div className="h-48 overflow-hidden">
          <img 
            src={images[currentImageIndex]} 
            alt={`${title} screenshot ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Carousel controls - only visible on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          {/* Previous arrow */}
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-100"
          >
            <ArrowLeft className="w-4 h-4 text-gray-800" />
          </button>

          {/* Next arrow */}
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-100"
          >
            <ArrowRight className="w-4 h-4 text-gray-800" />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Title and description below the card */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {isNew && (
            <div className="bg-[#FF7B00] text-white text-xs font-medium px-2 py-1 rounded-md">
              New
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;