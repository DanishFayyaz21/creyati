import React from "react";
import { siteData } from "../data";

const About = () => {
  const { about } = siteData;
  return (
    <section className="animate-text py-10 lg:pt-28 lg:pb-0 h-full">
      <div className="w-[91%] mx-auto">
        <div className="flex flex-col-reverse gap-8 lg:gap-0 lg:grid lg:grid-cols-2 overflow-hidden lg:rounded-tl-[20px] lg:rounded-tr-[20px] items-center relative">
          <div className="overflow-hidden relative w-full rounded-[10px] lg:rounded-none h-[400px] lg:h-full block lg:hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover origin-top"
              src={about.videombl}
            />
          </div>
          <div className="overflow-hidden relative w-full rounded-[10px] lg:rounded-none h-[400px] lg:h-full hidden lg:block">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover  origin-top"
              src={about.video}
            />
          </div>
          <div className="overflow-hidden h-[450px] lg:h-full hidden lg:block">
            <img
              src={about.image}
              alt="about"
              className="aspect-square object-cover w-full h-full"
            />
          </div>
          <div className="max-w-[560px] lg:w-[90%] bg-black/80 rounded-[20px] lg:py-8 lg:px-5 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:right-0 mx-auto">
            <div className="text-center mx-auto w-[88%] lg:w-[90%]">
              <h2 className="heading2 text-fill-white font-normal mb-2.5 max-w-[280px] md:max-w-[400px] w-full mx-auto">
                {about.title}
              </h2>
              {/* <span className="border-line mx-0"></span> */}
              <p className="text-sm font-unbounded text-fill-white mb-2.5 max-w-[280px] mx-auto md:max-w-full">
                {about.subtitle}
              </p>
              <p className="para2 text-fill-white mb-0 max-w-[420px] w-full mx-auto">
                {about.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
