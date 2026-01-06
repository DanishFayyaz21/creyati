import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const wordsData = [
  {
    title: "ideation",
    text: "Creyeti is a Sydney-based boutique creative production agency specialising in integrated media production. We offer end-to-end digital, print, broadcast, and experiential solutions for emerging and established brands.",
  },
  {
    title: "foundation",
    text: "We lay the groundwork for impactful brands, building strategies and structures that ensure long-term success in the competitive market.",
  },
  {
    title: "construction",
    text: "Turning vision into reality through precision and creativity, we craft compelling campaigns and media solutions that stand out.",
  },
  {
    title: "execution",
    text: "From start to finish, we execute flawless productions, delivering high-quality results that captivate audiences and drive engagement.",
  },
];

const AboutBannerOld = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-60 pb-40 bg-black text-white">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-2 gap-10 items-center">
          {/* Layered Text — animation applied to each span separately */}
          <div className="relative leading-none h-[15rem] overflow-hidden flex flex-col justify-center items-start">
            {/* Top faded text */}
            <AnimatePresence mode="wait">
              <motion.span
                key={"top-" + wordsData[index].title}
                className="block text-[6rem] font-medium text-gray-500 absolute top-[0rem] left-0 opacity-40 h-16 overflow-hidden capitalize"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {wordsData[index].title}
              </motion.span>
            </AnimatePresence>

            {/* Main white text */}
            <AnimatePresence mode="wait">
              <motion.span
                key={"main-" + wordsData[index].title}
                className="block text-[6rem] font-medium text-white relative z-10 capitalize"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {wordsData[index].title}
              </motion.span>
            </AnimatePresence>

            {/* Bottom outline text */}
            <AnimatePresence mode="wait">
              <motion.span
                key={"bottom-" + wordsData[index].title}
                className="text-[6rem] font-medium absolute bottom-[0rem] flex justify-end items-end left-0 text-transparent stroke-white opacity-40 h-12 overflow-hidden capitalize"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {wordsData[index].title}
              </motion.span>
            </AnimatePresence>
          </div>
          <div>
            {/* Paragraph animation */}
            <AnimatePresence mode="wait">
              <motion.span
                key={wordsData[index].text}
                className="text-2xl leading-normal block text-fill-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {wordsData[index].text}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBannerOld;
