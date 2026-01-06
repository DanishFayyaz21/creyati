// src/pages/services/Videography.jsx
import React from "react";
import { siteData } from "../../data";
import ContactUs from "../../components/ContactUs";
import ServiceNavigation from "../../components/services/ServiceNavigation";

const Videography = () => {
  const service = siteData.services.servicesDetail.list.find(
    (s) => s.slug === "videography"
  );

  if (!service) return <div>Not found</div>;

  return (
    <>
      <section className="pt-40 pb-20 bg-black text-white">
        <div className="container mx-auto">
          {/* Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={service.video}
              />
            </div>
            <div className="grid grid-cols-1">
              <div className="border-[0.5px] border-white px-10 md:px-14 py-8 md:py-14">
                <h2 className="text-[22px] font-normal uppercase lg:text-3xl mb-5">
                  {service.title}
                </h2>
                <p>{service.description}</p>
              </div>
              <div className="border-[0.5px] border-white px-10 md:px-14 py-8">
                <h2 className="text-[22px] font-normal uppercase lg:text-3xl mb-5">
                  WHAT TO EXPECT
                </h2>
                <ul className="list-disc font-urbanist list-inside space-y-3">
                  {service.expectations.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Custom gallery for Videography */}
          <div className="grid gap-3 pt-16">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {service.gallery.slice(0, 4).map((src, i) => (
                  <video
                    key={i}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-[207px] md:h-[258px] object-cover"
                  />
                ))}
              </div>
              <div className="col-span-12 lg:col-span-4">
                <video
                  src={service.gallery[4]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[223px] md:h-[538px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Service Navigation */}
          <ServiceNavigation currentSlug="videography" />
        </div>
      </section>
      <ContactUs />
    </>
  );
};

export default Videography;
