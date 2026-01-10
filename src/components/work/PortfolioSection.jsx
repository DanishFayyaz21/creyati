import { useState } from "react";
import { siteData } from "../../data";
import { Link } from "react-router-dom";
import ArrowblackBtn from "../../assets/images/arrow-black.svg";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function PortfolioSection() {
  const { categories, projects } = siteData.portfolio;
  const [activeCategory, setActiveCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-black min-h-screen pb-10 md:py-10 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="hidden md:flex w-full md:w-[233px] flex-col gap-5 h-fit sticky top-24">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xl font-normal h-11 flex items-center justify-center border ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "border-white text-white hover:bg-white hover:text-black transition"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:hidden mb-6">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex justify-center gap-3 items-center rounded-lg px-4 py-2 text-xl font-normal h-11 text-black bg-white"
            >
              <span
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "-rotate-180" : "rotate-0"
                }`}
              >
                <img src={ArrowblackBtn} alt="arrow-icon" />
              </span>
              {activeCategory}
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-black flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 text-center text-xl font-normal rounded-lg bg-white text-black"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full md:w-[calc(100%-300px)] flex flex-col gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/portfolio/${project.slug}`}
                className="relative rounded-2xl overflow-hidden block"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-80 object-cover"
                  src={project.video}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={project.logo}
                    alt={project.title}
                    className="max-w-[200px] w-full"
                  />
                </div>
              </Link>
            ))}

            {/* <button className="btn bg-white text-black uppercase mt-8 max-w-fit mx-auto">
              See More <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
