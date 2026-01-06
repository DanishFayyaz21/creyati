// src/components/services/ServicesDetail.jsx
import React from "react";
import { Link } from "react-router-dom";
import { siteData } from "../../data";

const ServicesDetail = () => {
  const { servicesDetail } = siteData.services;

  return (
    <section className="pb-20 pt-5 lg:pb-28 bg-black text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {servicesDetail.list.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={index}
              className="relative group overflow-hidden rounded-md cursor-pointer"
            >
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
              <div className="mt-3 flex items-center justify-between">
                <h3 className="text-sm text-fill-white font-semibold uppercase">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesDetail;
