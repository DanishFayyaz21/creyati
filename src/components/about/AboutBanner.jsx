import React from "react";
import { siteData } from "../../data";

const AboutBanner = () => {
  const { aboutPageBanner } = siteData.aboutPage;
  return (
    <section className="pt-40 pb-20 bg-black text-white">
      <h1 className="text-[9vw] w-[90%] mx-auto text-center uppercase">
        {aboutPageBanner.title}
      </h1>
      <img src={aboutPageBanner.img} alt="img" className="w-full md:w-[90%] mx-auto h-full object-cover" />
    </section>
  );
};

export default AboutBanner;
