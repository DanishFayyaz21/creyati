// src/components/work/PortfolioNavigation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { siteData } from "../../data";

const PortfolioNavigation = ({ currentSlug }) => {
  const navigate = useNavigate();
  const projects = siteData.portfolio.projects;

  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug
  );

  const previousProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0];

  const handleNavigation = (slug) => {
    navigate(`/portfolio/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-between items-center py-8 border-t border-white/20 gap-4">
      {/* Previous Project */}
      <button
        onClick={() => handleNavigation(previousProject.slug)}
        className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors group max-w-[45%]"
      >
        <div className="flex flex-col items-end text-right">
          <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
            Previous
          </span>
          <span className="text-[12px] sm:text-base md:text-lg font-medium group-hover:underline truncate">
            {previousProject.title}
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

      {/* Next Project */}
      <button
        onClick={() => handleNavigation(nextProject.slug)}
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
            {nextProject.title}
          </span>
        </div>
      </button>
    </div>
  );
};

export default PortfolioNavigation;
