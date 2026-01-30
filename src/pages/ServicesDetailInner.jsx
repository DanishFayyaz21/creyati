// ServicesDetailInner.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { siteData } from "../data";

const ServicesDetailInner = () => {
  const { slug } = useParams();
  const service = siteData.services.servicesDetail.list.find(
    (s) => s.slug === slug
  );

  if (!service)
    return <div className="text-center py-20">Service not found</div>;

  return (
    <>
      <section className="pt-40 pb-20 bg-black text-black">
        <div className="container mx-auto">
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
                <h2 className="text-[22px] font-normal uppercase lg:text-3xl text-fill-white mb-5">
                  {service.title}
                </h2>
                <p className="text-fill-white">{service.description}</p>
              </div>
              <div className="border-[0.5px] border-white px-10 md:px-14 py-8">
                <h2 className="text-[22px] font-normal uppercase lg:text-3xl text-fill-white mb-5">
                  WHAT TO EXPECT
                </h2>
                {service.expectations && service.expectations.length > 0 ? (
                  <ul className="list-disc list-inside space-y-3 text-white font-urbanist">
                    {service.expectations.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white italic">
                    No expectations available.
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Gallery */}
          <div className="grid gap-3 pt-16">
            {slug === "videography" ? (
              <div className="grid grid-cols-12 gap-3">
                {/* Row 1: 3 items */}
                <div className="col-span-12 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <video
                      src={service.gallery[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[258px] md:h-full object-cover"
                    />
                  </div>
                  <div>
                    <video
                      src={service.gallery[1]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[258px] md:h-full object-cover"
                    />
                  </div>
                  <div>
                    <video
                      src={service.gallery[2]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[258px] md:h-full object-cover"
                    />
                  </div>
                  <div>
                    <video
                      src={service.gallery[3]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[258px] md:h-full object-cover"
                    />
                  </div>
                </div>

                {/* Row 2: 2 items */}
                <div className="col-span-12 lg:col-span-3">
                  <div>
                    <video
                      src={service.gallery[4]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[258px] md:h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Default 8 image grid
              <>
                {/* Row 1: 3 images */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 lg:col-span-5">
                    <img
                      src={service.gallery[0]}
                      alt="img-0"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                    <img
                      src={service.gallery[1]}
                      alt="img-1"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                    />
                    <img
                      src={service.gallery[2]}
                      alt="img-2"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                    />
                  </div>
                </div>

                {/* Row 2: 2 images */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6 lg:col-span-5">
                    <img
                      src={service.gallery[3]}
                      alt="img-4"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
                    />
                  </div>
                  <div className="col-span-6 lg:col-span-7">
                    <img
                      src={service.gallery[4]}
                      alt="img-5"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
                    />
                  </div>
                </div>

                {/* Row 3: 3 images */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Full-width image on md and up */}
                  <div className="col-span-12 lg:col-span-4">
                    <img
                      src={service.gallery[5]}
                      alt="img-6"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[400px] md:max-h-[300px] object-cover md:object-top"
                    />
                  </div>

                  {/* Two side-by-side images */}
                  <div className="col-span-6 lg:col-span-4">
                    <img
                      src={service.gallery[6]}
                      alt="img-7"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
                    />
                  </div>
                  <div className="col-span-6 lg:col-span-4">
                    <img
                      src={service.gallery[7]}
                      alt="img-8"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section>{/* <HighlightsCarousel /> */}</section>
    </>
  );
};

export default ServicesDetailInner;
