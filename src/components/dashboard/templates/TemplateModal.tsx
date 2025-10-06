"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: number;
    title: string;
    description: string;
    images: string[];
    isNew?: boolean;
  } | null;
}

const TemplateModal = ({ isOpen, onClose, template }: TemplateModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!template) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % template.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + template.images.length) % template.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden bg-white">
        {/* Header with exit button */}
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{template.title}</h2>
            <p className="text-gray-600 mt-1">{template.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Main content */}
        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Image display */}
          <div className="flex-1 relative bg-white flex items-center justify-center p-8">
            <img 
              src={template.images[currentImageIndex]} 
              alt={`${template.title} screenshot ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />

            {/* Navigation arrows */}
            {template.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail navigation */}
          {template.images.length > 1 && (
            <div className="p-6 bg-white">
              <div className="flex items-center justify-center space-x-2">
                {template.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative overflow-hidden rounded-lg transition-all ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-[#FF7B00] scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={template.images[index]} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-[#FF7B00]/10"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="text-center mt-4 text-sm text-gray-600">
                {currentImageIndex + 1} of {template.images.length}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateModal;