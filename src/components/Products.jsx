import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { siteData } from "../data";
import "swiper/css";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products } = siteData;
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="py-10">
      <div className="container mb-10">
        <h2 className="heading2 text-center text-fill-white">
          {products.title}
        </h2>
      </div>

      <div className="relative group/carousel">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-transparent hover:backdrop-blur-sm flex items-center justify-center"
        >
          <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-transparent hover:backdrop-blur-sm flex items-center justify-center"
        >
          <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </button>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={2500}                // ⬅ slow continuous movement
          slidesPerView={1.5}
          spaceBetween={16}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            1280: { slidesPerView: 4.5 },
            768: { slidesPerView: 3.5 },
            480: { slidesPerView: 2.5 },
          }}
          className="products-swiper"
        >
          {products.list.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => navigate(`/portfolio/${item.slug}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg relative"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[600px] lg:h-[650px] object-contain"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {item.name}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* See More Button */}
          <button
            onClick={() => navigate("/work")}
            className="btn bg-white text-black uppercase mt-16 max-w-fit mx-auto"
          >
            See More <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </Swiper>
      </div>
    </section>
  );
};

export default Products;
