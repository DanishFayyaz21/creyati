import React from "react";
import { siteData } from "../data";

const Globe = () => {
  const { globe } = siteData.aboutPage;
  return (
    <section className="py-5 md:py-20">
      <div className="container-fluid">
        <h2 className="heading2 text-fill-white max-w-full text-center w-full mb-10">{globe.title}</h2>
      </div>
      <div className="h-[400px] sm:min-h-[85vh] relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={globe.video}
        />
      </div>
    </section>
  );
};

export default Globe;
