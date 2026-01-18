import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "../data";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const imitateRef = useRef(null);
  const innovateRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const splitText = (element) => {
      const text = element.innerText;
      element.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="inline-block">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");
    };

    splitText(imitateRef.current);
    splitText(innovateRef.current);

    const imitateChars = imitateRef.current.querySelectorAll("span");
    const innovateChars = innovateRef.current.querySelectorAll("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imitateRef.current,
        start: "top 80%",
      },
    });

    tl.from(imitateChars, {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        innovateChars,
        {
          y: 80,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
  }, []);

  const { hero } = siteData;

  return (
    <section className="min-h-screen bg-black flex justify-center items-center relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        src={hero.video}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
        src={hero.videombl}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container relative z-10">
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-center font-syne relative">
            <span className="relative block max-w-fit mx-auto text-4xl heading sm:text-6xl lg:[9rem] xl:text-[10rem] font-bold text-white line-through decoration-red-600">
              <span ref={imitateRef}>{hero.title1}</span>
              <span
                ref={lineRef}
                className="absolute left-0 top-1/2 w-full h-1 lg:h-[10px] bg-red-600 pointer-events-none"
                style={{
                  transform: "translateY(-50%) scaleX(1)",
                }}
              ></span>
            </span>

            <br />

            <span
              ref={innovateRef}
              className="text-5xl heading sm:text-7xl md:text-[6rem] lg:text-[8.5rem] xl:text-[10rem] 2xl:text-[11rem] font-bold text-white"
            >
              {hero.title2}
            </span>
          </h1>

          <Link
            to="/contact"
            className="text-base font-semibold bg-white text-black px-8 h-12 flex items-center justify-center max-w-fit rounded-full hover:bg-gray-200 transition-colors duration-300 capitalize"
          >
            {hero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
