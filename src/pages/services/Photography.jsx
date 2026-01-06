// src/pages/services/Photography.jsx
import React from "react";
import { siteData } from "../../data";
import ContactUs from "../../components/ContactUs";
import ServiceNavigation from "../../components/services/ServiceNavigation";

const Photography = () => {
  const service = siteData.services.servicesDetail.list.find(
    (s) => s.slug === "photography"
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

          {/* Photography-specific gallery */}
          <div className="grid gap-3 pt-16">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src={service.gallery[0]}
                  alt="gallery-0"
                  className="rounded-lg lg:rounded-[25px] w-full h-[207px] md:h-[576px] object-cover object-top"
                />
              </div>
              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3">
                <img
                  src={service.gallery[1]}
                  alt="gallery-1"
                  className="rounded-lg lg:rounded-[25px] w-full h-[303px] md:h-[576px] object-cover"
                />
                <img
                  src={service.gallery[2]}
                  alt="gallery-2"
                  className="rounded-lg lg:rounded-[25px] w-full h-[303px] md:h-[576px] object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src={service.gallery[3]}
                  alt="img-4"
                  className="rounded-lg lg:rounded-[25px] w-full h-[207px] md:h-[373px] object-cover"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <img
                  src={service.gallery[4]}
                  alt="img-5"
                  className="rounded-lg lg:rounded-[25px] w-full h-[207px] md:h-[373px] object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-4">
                <img
                  src={service.gallery[5]}
                  alt="img-6"
                  className="rounded-lg lg:rounded-[25px] w-full h-[303px] md:h-[573px] object-cover"
                />
              </div>

              <div className="col-span-12 lg:col-span-4">
                <img
                  src={service.gallery[6]}
                  alt="img-7"
                  className="rounded-lg lg:rounded-[25px] w-full h-[303px] md:h-[573px] object-cover"
                />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <img
                  src={service.gallery[7]}
                  alt="img-8"
                  className="rounded-lg lg:rounded-[25px] w-full h-[303px] md:h-[573px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Service Navigation */}
          <ServiceNavigation currentSlug="photography" />
        </div>
      </section>
      <ContactUs />
    </>
  );
};

export default Photography;
