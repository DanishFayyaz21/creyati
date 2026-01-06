import React from "react";
import Slider from "react-slick";
import { siteData } from "../../data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 hover:bg-black text-white rounded-full p-2 z-10"
    onClick={onClick}
  >
    <ChevronRightIcon className="w-5 h-5" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 hover:bg-black text-white rounded-full p-2 z-10"
    onClick={onClick}
  >
    <ChevronLeftIcon className="w-5 h-5" />
  </button>
);

const HighlightsCarousel = () => {
  const { highlights } = siteData;

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 bg-black text-white relative">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-center heading2 text-fill-white mb-10 uppercase">
          {highlights.title}
        </h2>

        {/* Slider */}
        <Slider {...settings}>
          {highlights.list.map((item, index) => (
            <div key={index} className="px-3">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[400px] md:h-[530px] object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg text-fill-white font-semibold">{item.name}</h3>
                  <p className="text-sm text-fill-white text-gray-300">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Button */}
        <div className="text-center mt-10">
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto">
            SEE MORE <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighlightsCarousel;
