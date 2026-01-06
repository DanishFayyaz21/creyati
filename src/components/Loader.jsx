import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const leftPanel = useRef(null);
  const rightPanel = useRef(null);
  const textWrapper = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // Fade in text wrapper
    tl.fromTo(
      textWrapper.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );

    // Bottom-to-top fill animation
    tl.fromTo(
      fillRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" }, // hidden from bottom
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
      "-=0.3"
    );

    // Window opening panels
    tl.to(leftPanel.current, {
      x: "-100%",
      duration: 1,
      ease: "power4.inOut",
    });
    tl.to(
      rightPanel.current,
      {
        x: "100%",
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    // Fade out text
    tl.to(
      textWrapper.current,
      { opacity: 0, duration: 0.5, ease: "power2.inOut" },
      "-=0.5"
    );
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Left Panel */}
      <div
        ref={leftPanel}
        className="absolute left-0 top-0 h-full w-1/2 bg-[#ededed]"
      ></div>

      {/* Right Panel */}
      <div
        ref={rightPanel}
        className="absolute right-0 top-0 h-full w-1/2 bg-[#ededed]"
      ></div>

      {/* Text with fill effect */}
      <h1
        ref={textWrapper}
        className="relative text-5xl uppercase font-unbounded md:text-7xl font-extrabold text-black/20 z-10"
        // style={{ WebkitTextStroke: "1px white" }}
      >
        creyeti
        <span
          ref={fillRef}
          className="absolute left-0 top-0 w-full h-full text-black"
          //   style={{
          //     WebkitTextStroke: "0px",
          //   }}
        >
          creyeti
        </span>
      </h1>
    </div>
  );
};

export default Loader;
