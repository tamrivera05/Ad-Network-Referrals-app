"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/Sidebar";

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");
  const [template, setTemplate] = useState<any>(null);

  // Complete template data with more screenshots for detail view
  const allTemplates = [
    {
      id: 1,
      title: "CPA Landing Page",
      description: "High-converting landing page for CPA offers with optimized design and user experience. This template includes multiple variations for different niches and industries.",
      category: "Landing Pages",
      createdAt: "2024-01-15",
      downloads: 1234,
      rating: 4.8,
      features: [
        "Responsive design",
        "Mobile optimized",
        "High conversion rate",
        "Easy customization",
        "Cross-browser compatible",
        "SEO friendly"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=CPA+Landing+Page+-+Hero+Section",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=CPA+Landing+Page+-+Features",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=CPA+Landing+Page+-+Testimonials",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=CPA+Landing+Page+-+Pricing",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=CPA+Landing+Page+-+FAQ",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=CPA+Landing+Page+-+Contact+Form",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=CPA+Landing+Page+-+Mobile+View",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=CPA+Landing+Page+-+Thank+You"
      ],
      isNew: false
    },
    {
      id: 2,
      title: "Email Capture Form",
      description: "Optimized form for email collection with advanced validation and auto-responder integration. Perfect for building your email list with high-converting designs.",
      category: "Forms",
      createdAt: "2024-01-20",
      downloads: 892,
      rating: 4.6,
      features: [
        "Email validation",
        "Auto-responder integration",
        "Mobile responsive",
        "Custom fields support",
        "GDPR compliant",
        "A/B testing ready"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Email+Capture+-+Main+Form",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Email+Capture+-+Success+Message",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Email+Capture+-+Mobile+Form",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Email+Capture+-+Sidebar+Form",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Email+Capture+-+Popup+Form",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Email+Capture+-+Inline+Form",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Email+Capture+-+Multi-Step+Form",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Email+Capture+-+Thank+You+Page"
      ],
      isNew: true
    },
    {
      id: 3,
      title: "Survey Page",
      description: "Interactive survey for lead generation with multiple question types and conditional logic. Great for gathering customer insights and qualifying leads.",
      category: "Surveys",
      createdAt: "2024-01-18",
      downloads: 756,
      rating: 4.7,
      features: [
        "Multiple question types",
        "Progress tracking",
        "Conditional logic",
        "Real-time validation",
        "Mobile optimized",
        "Analytics integration"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Survey+-+Introduction",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Survey+-+Multiple+Choice",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Survey+-+Text+Questions",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Survey+-+Progress+Bar",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Survey+-+Results+Page",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Survey+-+Mobile+View",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Survey+-+Thank+You",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Survey+-+Analytics+Dashboard"
      ],
      isNew: false
    },
    {
      id: 4,
      title: "Video Landing Page",
      description: "Engaging video-based landing page with custom video player and call-to-action overlays. Perfect for product demonstrations and brand storytelling.",
      category: "Landing Pages",
      createdAt: "2024-01-22",
      downloads: 1102,
      rating: 4.9,
      features: [
        "Video autoplay",
        "Custom video player",
        "Mobile video optimization",
        "Video analytics",
        "Call-to-action overlays",
        "Social sharing"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Video+Landing+-+Hero+Video",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Video+Landing+-+Video+Player",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Video+Landing+-+CTA+Overlay",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Video+Landing+-+Video+Gallery",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Video+Landing+-+Testimonials",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Video+Landing+-Mobile+Video",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Video+Landing+-+Video+Controls",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Video+Landing+-+Share+Section"
      ],
      isNew: false
    },
    {
      id: 5,
      title: "Mobile App Landing",
      description: "Mobile-optimized landing page with app store buttons and device mockups. Designed specifically to drive mobile app downloads and installations.",
      category: "Landing Pages",
      createdAt: "2024-01-25",
      downloads: 1456,
      rating: 4.8,
      features: [
        "App store buttons",
        "Device mockups",
        "Touch-friendly interface",
        "App preview videos",
        "Download tracking",
        "Push notification ready"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Mobile+App+-+Hero+Section",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Mobile+App+-+Device+Mockups",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Mobile+App+-+App+Store+Buttons",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Mobile+App+-+Features+Grid",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Mobile+App+-+Screenshots",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Mobile+App+-+Testimonials",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Mobile+App+-+Download+Stats",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Mobile+App+-+Mobile+View"
      ],
      isNew: false
    },
    {
      id: 6,
      title: "Thank You Page",
      description: "Confirmation page for conversions with social sharing and related offers. Perfect for post-conversion engagement and upselling opportunities.",
      category: "Confirmation",
      createdAt: "2024-01-28",
      downloads: 623,
      rating: 4.5,
      features: [
        "Conversion tracking",
        "Social sharing options",
        "Related offers display",
        "Email confirmation",
        "Analytics integration",
        "Custom branding"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Thank+You+-+Success+Message",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Thank+You+-+Order+Details",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Thank+You+-+Social+Sharing",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Thank+You+-+Related+Products",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Thank+You+-+Email+Confirmation",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Thank+You+-+Mobile+View",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Thank+You+-+Countdown+Timer",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Thank+You+-+Next+Steps"
      ],
      isNew: false
    },
    {
      id: 7,
      title: "Squeeze Page",
      description: "High-converting squeeze page template with lead magnet delivery and urgency timers. Designed to maximize email sign-ups and lead generation.",
      category: "Landing Pages",
      createdAt: "2024-02-01",
      downloads: 987,
      rating: 4.7,
      features: [
        "Lead magnet delivery",
        "Email integration",
        "Urgency timers",
        "Testimonial sections",
        "Benefit highlights",
        "Mobile responsive"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Squeeze+Page+-+Hero+Section",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Squeeze+Page+-+Lead+Magnet",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Squeeze+Page+-+Email+Form",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Squeeze+Page+-+Urgency+Timer",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Squeeze+Page+-+Testimonials",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Squeeze+Page+-+Benefits",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Squeeze+Page+-+Mobile+Form",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Squeeze+Page+-+Thank+You"
      ],
      isNew: true
    },
    {
      id: 8,
      title: "Webinar Registration",
      description: "Webinar landing page with registration, countdown timer, and speaker profiles. Perfect for promoting online events and collecting registrations.",
      category: "Events",
      createdAt: "2024-02-05",
      downloads: 543,
      rating: 4.6,
      features: [
        "Event countdown timer",
        "Calendar integration",
        "Speaker profiles",
        "Agenda display",
        "Email reminders",
        "Zoom integration"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Webinar+-+Event+Header",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Webinar+-+Registration+Form",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Webinar+-+Speaker+Profiles",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Webinar+-+Event+Agenda",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Webinar+-+Countdown+Timer",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Webinar+-+Calendar+Integration",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Webinar+-+Mobile+Registration",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Webinar+-+Confirmation+Email"
      ],
      isNew: false
    },
    {
      id: 9,
      title: "Product Launch",
      description: "Product launch landing page with coming soon timer and pre-order system. Designed to build anticipation and drive early sales.",
      category: "Landing Pages",
      createdAt: "2024-02-08",
      downloads: 721,
      rating: 4.8,
      features: [
        "Coming soon timer",
        "Early bird pricing",
        "Product showcase",
        "Feature comparison",
        "Pre-order system",
        "Social proof widgets"
      ],
      images: [
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Product+Launch+-+Coming+Soon",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Product+Launch+-+Product+Showcase",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Product+Launch+-+Feature+Comparison",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Product+Launch+-+Pre-Order+Form",
        "https://placehold.co/1200x800/FF7B00/FFFFFF?text=Product+Launch+-+Early+Bird+Pricing",
        "https://placehold.co/1200x800/FF8D21/FFFFFF?text=Product+Launch+-+Social+Proof",
        "https://placehold.co/1200x800/FFA652/FFFFFF?text=Product+Launch+-+Mobile+View",
        "https://placehold.co/1200x800/FFB76B/FFFFFF?text=Product+Launch+-+Launch+Countdown"
      ],
      isNew: false
    }
  ];

  useEffect(() => {
    // First try to get template data from navigation state
    if (location.state?.template) {
      // Find the full template data from the allTemplates array
      const templateId = location.state.template.id;
      const fullTemplate = allTemplates.find(t => t.id === templateId);
      setTemplate(fullTemplate || null);
    } else {
      // Fallback to ID-based lookup
      const templateId = parseInt(id || "1");
      const foundTemplate = allTemplates.find(t => t.id === templateId);
      setTemplate(foundTemplate || null);
    }
  }, [id, location.state]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && template) {
      setSelectedImageIndex((prev) => (prev! + 1) % template.images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && template) {
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
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Downloads:</span>
                  <span className="font-medium text-gray-900">{template.downloads}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Rating:</span>
                  <span className="font-medium text-gray-900">{template.rating} ⭐</span>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {template.features.map((feature: string, index: number) => (
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
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Template Screenshots</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {template.images.length} screenshots showing all template variations and features
                  </p>
                </div>
                <Button className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white">
                  Use This Template
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {template.images.map((image: string, index: number) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    onClick={() => handleImageClick(index)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gray-100 aspect-video">
                        <img 
                          src={image} 
                          alt={`${template.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {index + 1}/{template.images.length}
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
                <p className="text-gray-700 mb-6">Get instant access to all {template.images.length} screenshots and start building your campaigns today.</p>
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
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{template.title}</h2>
              <p className="text-gray-600 mt-1">
                Screenshot {selectedImageIndex !== null ? selectedImageIndex + 1 : 1} of {template.images.length}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Main content */}
          <div className="flex flex-col h-[calc(90vh-120px)]">
            {/* Image display */}
            <div className="flex-1 relative bg-gray-50 flex items-center justify-center p-8">
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail navigation */}
            {template.images.length > 1 && (
              <div className="p-6 bg-white border-t">
                <div className="flex items-center justify-center space-x-2 overflow-x-auto">
                  {template.images.map((_: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative overflow-hidden rounded-lg transition-all flex-shrink-0 ${
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
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateDetail;