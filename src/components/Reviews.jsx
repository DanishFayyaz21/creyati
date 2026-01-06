import React, { useEffect, useRef } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { siteData } from "../data"; // import siteData

const Reviews = () => {
  const { reviews: reviewsData } = siteData;

  return (
    <section className="bg-black py-20 xl:py-40">
      <div className="container">
        <div className="mb-10 lg:mb-20 text-center flex flex-col items-center justify-cente">
          <h2 className="heading2 text-fill-white mb-10">{reviewsData.title}</h2>
          {/* <span className="border-line bg-white mx-0 my-5"></span> */}
          <p className="para text-fill-white max-w-[571px] font-urbanist mx-auto">
            {reviewsData.description}
          </p>
        </div>
        <div className="relative">
          <div className="bg-black-gradient h-[321px] w-full absolute left-0 top-0 z-[1] rotate-180"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-hidden">
            <ScrollingColumn reviewsList={reviewsData.list} speed={1} />
            <ScrollingColumn
              reviewsList={reviewsData.list}
              speed={2}
              className="hidden md:block"
            />
            <ScrollingColumn
              reviewsList={reviewsData.list}
              speed={1.4}
              className="hidden md:block"
            />
          </div>
          <div className="bg-black-gradient h-[321px] w-full absolute left-0 bottom-0 z-[1]"></div>
        </div>
      </div>
    </section>
  );
};

const ScrollingColumn = ({ reviewsList, speed, className }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrame;

    const scrollContent = () => {
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
        scrollContainer.scrollTop = 0;
      }
      scrollContainer.scrollTop += speed;
      animationFrame = requestAnimationFrame(scrollContent);
    };

    animationFrame = requestAnimationFrame(scrollContent);

    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  return (
    <div ref={scrollRef} className={`overflow-hidden h-[800px] ${className}`}>
      <div className="flex flex-col">
        {reviewsList.concat(reviewsList).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="border border-[rgba(255,255,255,0.10)] p-5 xl:p-8 rounded-[40px] bg-[#F6F6F6] relative mb-5">
    <div className="flex items-center gap-2 mb-8">
      {Array(review.stars)
        .fill(0)
        .map((_, i) => (
          <StarIcon key={i} className="w-6 h-6 text-yellow-500" />
        ))}
    </div>
    <span className="text-base leading-relaxed text-gray-600 mb-5 xl:mb-8">
      {review.para}
    </span>
    <span className="text-sm font-medium leading-tight text-[#0F172A]">
      {review.title} <br />
      {review.hobby}
    </span>
  </div>
);

export default Reviews;
