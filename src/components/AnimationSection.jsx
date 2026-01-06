import React from "react";
import { siteData } from "../data";

const animationSection = () => {
  const { animationSection } = siteData;
  return (
    <section className="lg:-mt-10 relative z-10">
      <div className="w-[91%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[270px] items-center gap-5 bg-black overflow-hidden rounded-[20px] shadow-white">
          <div className="overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[116px] md:h-full object-cover"
              src={animationSection.video1}
            />
          </div>
          <div className="overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[101px] md:h-full object-cover"
              src={animationSection.video2}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default animationSection;
