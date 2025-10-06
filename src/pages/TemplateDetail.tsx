"use client";

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/Sidebar";

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");
  const navigate = useNavigate();

  // Mock template data - in a real app this would come from an API
  const template = {
    id: parseInt(id || "1"),
    title: "CPA Landing Page",
    description: "High-converting landing page for CPA offers with optimized design and user experience. This template includes multiple variations for different niches and industries.",
    category: "Landing Pages",
    createdAt: "2024-01-15",
    downloads: 1234,
    rating: 4.8,
    images: [
      "https://placehold.co/1200x800/f3f4f6/333333?text=CPA+Landing+Page+1",
      "https://placehold.co/1200x800/f3f4f6/333333?text=CPA+Landing+Page+2",
      "https://placehold.co/1200x800/f3f4f6/333333?text=CPA+Landing+Page+3",
      "https://placehold.co/1200x800/f3f4f6/333333?text=CPA+Landing+Page+4",
      "https://placehold.co/1200x800/f3f4f6/333333?text=CPA+Landing+Page+5",
      "https://placehold.co/1200x800/f3f4f6/333333?text=CPA+Landing+Page+6"
    ],
    features: [
      "Responsive design",
      "Mobile optimized",
      "High conversion rate",
      "Easy customization",
      "Cross-browser compatible",
      "SEO friendly"
    ],
    isNew: false
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % template.images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + template.images.length) % template.images.length);
    }
  };

  const goToImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handleBackToTemplates = () => {
    navigate("/dashboard?tab=templates");
  };

  if (!template) {
    return (
      <div className="flex h-screen bg-[#FFFFFF]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900">Template not found</h1>
              <button 
                onClick={handleBackToTemplates}
                className="text-[#FF7B00] hover:underline mt-4 inline-block"
              >
                Back to Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <button 
                onClick={handleBackToTemplates}
                className="flex items-center text-gray-600 hover:text-[#FF7B00] transition-colors mr-4"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Templates
              </button>
            </div>
          </div>

          {/* Template Content */}
          <div className="space-y-8">
            {/* Template Title Section */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">{template.title}</h2>
                    {template.isNew && (
                      <div className="bg-[#FF7B00] text-white text-sm font-medium px-3 py-1 rounded-md">
                        New
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mt-2">{template.description}</p>
                </div>
              </div>

              {/* Template Stats */}
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-900">{template.category}</span>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FF7B00] rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Template Screenshots</h3>
                <Button className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white">
                  Use This Template
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {template.images.map((image, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                    onClick={() => handleImageClick(index)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gray-100">
                        <img 
                          src={image} 
                          alt={`${template.title} screenshot ${index + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-[#FFF5EB] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#FF7B00] mb-4">Ready to use this template?</h3>
                <p className="text-gray-700 mb-6">Get instant access and start building your campaigns today.</p>
                <div className="flex justify-center">
                  <Button className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white px-8 py-3">
                    Use This Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for image viewing */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{template.title}</h2>
              <p className="text-gray-600 mt-1">{template.description}</p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col h-[calc(90vh-120px)]">
            {/* Image display */}
            <div className="flex-1 relative bg-white flex items-center justify-center p-8">
              {selectedImageIndex !== null && (
                <img 
                  src={template.images[selectedImageIndex]} 
                  alt={`${template.title} screenshot ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              )}

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
                        selectedImageIndex === index 
                          ? 'ring-2 ring-[#FF7B00] scale-105' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={template.images[index]} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-[#FF7B00]/10"></div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-center mt-4 text-sm text-gray-600">
                  {selectedImageIndex !== null ? selectedImageIndex + 1 : 1} of {template.images.length}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateDetail;