import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { siteData } from "../data";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products } = siteData;
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-10">
          <h2 className="heading2 text-center text-fill-white">
            {products.title}
          </h2>
        </div>
      </div>

      <div className="relative group/carousel">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-transparent hover:backdrop-blur-sm flex items-center justify-center transition-all duration-300"
        >
          <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-transparent hover:backdrop-blur-sm flex items-center justify-center transition-all duration-300"
        >
          <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
        </button>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.5}
          spaceBetween={16}
          loop={false}
          speed={6000}
          freeMode={{ enabled: true, momentum: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1280: { slidesPerView: 4.5 },
            // 1024: { slidesPerView: 3.5 },
            768: { slidesPerView: 3.5 },
            480: { slidesPerView: 2.5 },
          }}
          className="products-swiper"
        >
        {products.list.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => navigate(`/portfolio/${item.slug}`)}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-[600px] lg:h-[650px] object-contain"
              />
              {/* <div
                className="absolute left-0 right-0 mx-auto bottom-14 flex flex-col items-center justify-center text-center"
              >
                <span className="text-white text-xs font-bold block">
                  {item.name}
                </span>
              </div> */}
              {/* overlay hidden by default, fades in on hover */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center 
                              bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-white text-xs font-bold block">
                  {item.name}
                </span>
                {/* <span className="text-white/80 text-sm block">
                  {item.category}
                </span> */}
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
