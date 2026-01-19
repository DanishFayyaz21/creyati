import React, { useState, useEffect } from "react";
import { siteData } from "../data";
import { ArrowUpRightIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import ArrowBlackIcon from "../assets/images/arrow-black.svg";
import { motion, AnimatePresence } from "framer-motion";

const Showcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { title, list } = siteData.showcase;
  const activeItem = list[activeIndex];

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [list.length]);

  return (
    <section className="py-10 md:py-20 bg-black text-white">
      <div className="container">
        <h2 className="heading2 text-center text-fill-white mb-16">{title}</h2>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Tabs / Dropdown */}
          <div className="lg:w-[270px]">
            {/* Mobile Dropdown */}
            <div className="relative lg:hidden">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-white text-black text-lg font-medium"
              >
                <span
                  className={`transition-transform duration-300 text-black ${
                    openDropdown ? "-rotate-180" : "rotate-0"
                  }`}
                >
                  <img src={ArrowBlackIcon} alt="arrow-icon" />
                </span>
                {list[activeIndex].title}
              </button>

              {openDropdown && (
                <div className="absolute mt-2 w-full bg-black z-10">
                  {list.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index);
                        setOpenDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium flex items-center gap-2 transition-all duration-300
                        ${
                          activeIndex === index
                            ? "bg-white text-black"
                            : "text-white hover:bg-white/10"
                        }`}
                    >
                      <span
                        className={`transition-transform duration-300 ${
                          activeIndex === index ? "text-black" : "text-black"
                        }`}
                      >
                        <img src={ArrowBlackIcon} alt="arrow-icon" />
                      </span>
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Tabs */}
            <div className="hidden lg:flex flex-col space-y-3">
              {list.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-lg text-center font-medium transition-all duration-300
                    ${
                      activeIndex === index
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                >
                  <span
                    className={`${
                      activeIndex === index ? " text-black" : "text-black"
                    }`}
                  >
                    ▶
                  </span>
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content with animation */}
          <div className="lg:w-[calc(100%-300px)]">
            <div className="relative lg:min-h-[540px] rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full lg:min-h-[540px] object-cover"
                    src={activeItem.video}
                  />
                  {/* Overlay */}
                  <div className="mt-4 lg:mt-0 lg:absolute lg:bottom-5 lg:left-1/2 lg:-translate-x-1/2 text-center flex flex-col-reverse lg:flex-col justify-center items-center gap-4 w-full">
                    {activeItem.link && (
                      <a
                        href="/services"
                        className="flex items-center justify-center h-9 mx-auto px-4 py-2 border border-white rounded-[10px] bg-transparent text-white font-medium hover:bg-white hover:text-black transition max-w-[128px] w-full text-base"
                      >
                        Explore <ArrowUpRightIcon className="w-6 h-6" />
                      </a>
                    )}
                    <p className="text-base lg:text-xl font-urbanist font-medium text-fill-white opacity-80 w-[90%] mx-auto">
                      {activeItem.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
