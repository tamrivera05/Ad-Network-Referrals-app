"use client";

import { useState, useEffect, useRef } from "react";
import TemplateCard from "./TemplateCard";

interface TemplateCarouselProps {
  selectedCategories?: string[];
}

const TemplateCarousel = ({ selectedCategories = [] }: TemplateCarouselProps) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const allTemplates = [
    {
      id: 1,
      title: "CPA Landing Page",
      description: "High-converting landing page for CPA offers",
      category: "Landing Pages",
      features: [
        "Responsive design",
        "Mobile optimized",
        "High conversion rate",
        "Easy customization",
        "Cross-browser compatible",
        "SEO friendly"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=CPA+Landing+Page+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=CPA+Landing+Page+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=CPA+Landing+Page+3"
      ],
      isNew: false
    },
    {
      id: 2,
      title: "Email Capture Form",
      description: "Optimized form for email collection",
      category: "Forms",
      features: [
        "Email validation",
        "Auto-responder integration",
        "Mobile responsive",
        "Custom fields support",
        "GDPR compliant",
        "A/B testing ready"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Email+Capture+Form+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Email+Capture+Form+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Email+Capture+Form+3"
      ],
      isNew: true
    },
    {
      id: 3,
      title: "Survey Page",
      description: "Interactive survey for lead generation",
      category: "Surveys",
      features: [
        "Multiple question types",
        "Progress tracking",
        "Conditional logic",
        "Real-time validation",
        "Mobile optimized",
        "Analytics integration"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Survey+Page+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Survey+Page+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Survey+Page+3"
      ],
      isNew: false
    },
    {
      id: 4,
      title: "Video Landing Page",
      description: "Engaging video-based landing page",
      category: "Landing Pages",
      features: [
        "Video autoplay",
        "Custom video player",
        "Mobile video optimization",
        "Video analytics",
        "Call-to-action overlays",
        "Social sharing"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Video+Landing+Page+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Video+Landing+Page+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Video+Landing+Page+3"
      ],
      isNew: false
    },
    {
      id: 5,
      title: "Mobile App Landing",
      description: "Mobile-optimized landing page",
      category: "Landing Pages",
      features: [
        "App store buttons",
        "Device mockups",
        "Touch-friendly interface",
        "App preview videos",
        "Download tracking",
        "Push notification ready"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Mobile+App+Landing+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Mobile+App+Landing+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Mobile+App+Landing+3"
      ],
      isNew: false
    },
    {
      id: 6,
      title: "Thank You Page",
      description: "Confirmation page for conversions",
      category: "Confirmation",
      features: [
        "Conversion tracking",
        "Social sharing options",
        "Related offers display",
        "Email confirmation",
        "Analytics integration",
        "Custom branding"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Thank+You+Page+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Thank+You+Page+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Thank+You+Page+3"
      ],
      isNew: false
    },
    {
      id: 7,
      title: "Squeeze Page",
      description: "High-converting squeeze page template",
      category: "Landing Pages",
      features: [
        "Lead magnet delivery",
        "Email integration",
        "Urgency timers",
        "Testimonial sections",
        "Benefit highlights",
        "Mobile responsive"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Squeeze+Page+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Squeeze+Page+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Squeeze+Page+3"
      ],
      isNew: true
    },
    {
      id: 8,
      title: "Webinar Registration",
      description: "Webinar landing page with registration",
      category: "Events",
      features: [
        "Event countdown timer",
        "Calendar integration",
        "Speaker profiles",
        "Agenda display",
        "Email reminders",
        "Zoom integration"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Webinar+Registration+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Webinar+Registration+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Webinar+Registration+3"
      ],
      isNew: false
    },
    {
      id: 9,
      title: "Product Launch",
      description: "Product launch landing page template",
      category: "Landing Pages",
      features: [
        "Coming soon timer",
        "Early bird pricing",
        "Product showcase",
        "Feature comparison",
        "Pre-order system",
        "Social proof widgets"
      ],
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Product+Launch+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Product+Launch+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Product+Launch+3"
      ],
      isNew: false
    }
  ];

  // Filter templates based on selected categories
  const filteredTemplates = allTemplates.filter(template => {
    if (selectedCategories.length === 0) {
      return true; // Show all templates if no filters selected
    }
    return selectedCategories.includes(template.category);
  });

  useEffect(() => {
    // Load initial filtered templates
    setTemplates(filteredTemplates.slice(0, 6));
  }, [selectedCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && templates.length < filteredTemplates.length) {
          loadMoreTemplates();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, templates, filteredTemplates]);

  const loadMoreTemplates = () => {
    if (loading || templates.length >= filteredTemplates.length) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const currentLength = templates.length;
      const nextTemplates = filteredTemplates.slice(currentLength, currentLength + 3);
      
      if (nextTemplates.length > 0) {
        setTemplates(prev => [...prev, ...nextTemplates]);
      }
      
      setLoading(false);
    }, 1000);
  };

  // Show message if no templates match the filter
  if (filteredTemplates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more templates</p>
      </div>
    );
  }

  return (
    <div>
      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
            images={template.images}
            isNew={template.isNew}
            category={template.category}
            features={template.features}
          />
        ))}
      </div>

      {/* Loading indicator - only show if there are more templates to load */}
      {templates.length < filteredTemplates.length && (
        <div ref={loaderRef} className="flex justify-center items-center py-8">
          {loading && (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-[#FF7B00]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Loading more templates...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateCarousel;