"use client";

import { useState, useEffect, useRef } from "react";
import TemplateCard from "./TemplateCard";

const TemplateCarousel = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const allTemplates = [
    {
      id: 1,
      title: "CPA Landing Page",
      description: "High-converting landing page for CPA offers",
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
      images: [
        "https://placehold.co/600x400/f3f4f6/333333?text=Product+Launch+1",
        "https://placehold.co/600x400/f3f4f6/333333?text=Product+Launch+2",
        "https://placehold.co/600x400/f3f4f6/333333?text=Product+Launch+3"
      ],
      isNew: false
    }
  ];

  useEffect(() => {
    // Load initial templates
    setTemplates(allTemplates.slice(0, 6));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && templates.length < allTemplates.length) {
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
  }, [loading, templates]);

  const loadMoreTemplates = () => {
    if (loading || templates.length >= allTemplates.length) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const currentLength = templates.length;
      const nextTemplates = allTemplates.slice(currentLength, currentLength + 3);
      
      if (nextTemplates.length > 0) {
        setTemplates(prev => [...prev, ...nextTemplates]);
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            images={template.images}
            isNew={template.isNew}
          />
        ))}
      </div>

      {/* Loading indicator - only show if there are more templates to load */}
      {templates.length < allTemplates.length && (
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