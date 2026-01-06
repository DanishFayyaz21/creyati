// src/components/services/ServiceNavigation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { siteData } from "../../data";

const ServiceNavigation = ({ currentSlug }) => {
  const navigate = useNavigate();
  const services = siteData.services.servicesDetail.list;

  const currentIndex = services.findIndex(
    (service) => service.slug === currentSlug
  );

  const previousService =
    currentIndex > 0
      ? services[currentIndex - 1]
      : services[services.length - 1];
  const nextService =
    currentIndex < services.length - 1
      ? services[currentIndex + 1]
      : services[0];

  const handleNavigation = (slug) => {
    navigate(`/services/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-between items-center py-8 border-t border-white/20 gap-4">
      {/* Previous Service */}
      <button
        onClick={() => handleNavigation(previousService.slug)}
        className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors group max-w-[45%]"
      >
        <div className="flex flex-col items-end text-right">
          <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
            Previous
          </span>
          <span className="text-[12px] sm:text-base md:text-lg font-medium group-hover:underline truncate">
            {previousService.title}
          </span>
        </div>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 transform rotate-180 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Next Service */}
      <button
        onClick={() => handleNavigation(nextService.slug)}
        className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors group max-w-[45%]"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <div className="flex flex-col items-start text-left">
          <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
            Next
          </span>
          <span className="text-[12px] sm:text-base md:text-lg font-medium group-hover:underline truncate">
            {nextService.title}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ServiceNavigation;
