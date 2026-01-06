// src/pages/services/SocialMedia.jsx
import React from "react";
import { siteData } from "../../data";
import ContactUs from "../../components/ContactUs";
import ServiceNavigation from "../../components/services/ServiceNavigation";

const SocialMedia = () => {
  const service = siteData.services.servicesDetail.list.find(
    (s) => s.slug === "social-media"
  );

  if (!service) return <div>Not found</div>;

  return (
    <>
      <section className="pt-40 pb-20 bg-black text-white">
        <div className="container mx-auto">
          {/* Hero section */}
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

          {/* SocialMedia-specific gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 pt-16">
            <div>
              <img
                src={service.gallery[0]}
                alt="gallery-0"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src={service.gallery[1]}
                alt="gallery-1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Service Navigation */}
          <ServiceNavigation currentSlug="social-media" />
        </div>
      </section>
      <ContactUs />
    </>
  );
};

export default SocialMedia;
