import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import product1 from "../assets/images/products/product-1.webp";
import product2 from "../assets/images/products/product-2.webp";
import product3 from "../assets/images/products/product-3.webp";
import product4 from "../assets/images/products/product-4.webp";
import product5 from "../assets/images/products/product-5.webp";
import product6 from "../assets/images/products/product-6.webp";
import product7 from "../assets/images/products/product-7.webp";
import product8 from "../assets/images/products/product-8.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Shared items (same as old component so WorkDetail works)
export const items = [
  {
    id: 1,
    title: "Work One",
    img: product8,
    description: "This is a detailed description about Work One.",
  },
  {
    id: 2,
    title: "Work Two",
    img: product2,
    description: "This is a detailed description about Work Two.",
  },
  {
    id: 3,
    title: "Work Three",
    img: product3,
    description: "This is a detailed description about Work Three.",
  },
  {
    id: 8,
    title: "Work Eight",
    img: product5,
    description: "This is a detailed description about Work Eight.",
  },
  {
    id: 4,
    title: "Work Four",
    img: product4,
    description: "This is a detailed description about Work Four.",
  },
  {
    id: 5,
    title: "Work Five",
    img: product6,
    description: "This is a detailed description about Work Five.",
  },
  {
    id: 6,
    title: "Work Six",
    img: product1,
    description: "This is a detailed description about Work Six.",
  },
  {
    id: 7,
    title: "Work Seven",
    img: product7,
    description: "This is a detailed description about Work Seven.",
  },
];

const Projects = () => {
  useEffect(() => {
    // ====== 1) SmoothScroll integration (Lenis / Locomotive / none) ======
    const SCROLLER_SELECTOR = ".smooth-scroll"; // <-- change if your scroll container differs
    const scrollerEl =
      document.querySelector(SCROLLER_SELECTOR) ||
      document.querySelector("[data-scroll-container]") ||
      null;

    // If you're using LocomotiveScroll and it sets transform on a container:
    // Expect a global instance like window.locoScroll (common pattern).
    if (scrollerEl && window.locoScroll) {
      // Tell ScrollTrigger to use the container's scroll position instead of window
      ScrollTrigger.scrollerProxy(scrollerEl, {
        scrollTop(value) {
          if (arguments.length) {
            window.locoScroll.scrollTo(value, {
              duration: 0,
              disableLerp: true,
            });
          }
          return window.locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollerEl.style.transform ? "transform" : "fixed",
      });

      // Update ScrollTrigger on Locomotive scroll
      window.locoScroll.on("scroll", ScrollTrigger.update);
    }

    // If you're using Lenis (common global: window.lenis)
    if (window.lenis) {
      // Keep ScrollTrigger in sync with Lenis
      window.lenis.on("scroll", ScrollTrigger.update);

      // If your app didn't already wire rAF, this keeps Lenis ticking with GSAP's ticker:
      if (!window.__lenisRafBound) {
        window.__lenisRafBound = true;
        gsap.ticker.add((t) => window.lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }

    // Helper to add scroller option only when needed
    const stBase = (extra = {}) =>
      scrollerEl && window.locoScroll
        ? { scroller: scrollerEl, ...extra }
        : extra; // Lenis uses window, so no scroller needed.

    // ====== 2) Accordion timeline (kept exactly like yours) ======
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: () => {
          // match the full stack height so the pin releases correctly
          const count = document.querySelectorAll(".accordion").length || 1;
          return "+=" + count * window.innerHeight;
        },
        scrub: 1,
        pin: true,
        pinSpacing: true, // keep space so next section doesn't overlap
        snap: {
          snapTo: (value) => {
            const count = document.querySelectorAll(".accordion").length;
            if (count < 2) return 0;
            const step = 1 / (count - 1);
            return Math.round(value / step) * step;
          },
          duration: 0.5,
          delay: 0.15,
          ease: "power1.inOut",
        },
        ...stBase(),
      },
    });

    // Your stacking effect
    tl.to(".accordion", { marginBottom: "-100vh", stagger: 0.5 }, 0);

    // ====== 3) Detail content fade-in/out (robust, no late show) ======
    const sections = gsap.utils.toArray(".accordion");

    sections.forEach((acc) => {
      const content = acc.querySelector(".content");
      if (!content) return;

      // Ensure starting state (handles Tailwind's opacity-0 + translate)
      gsap.set(content, { autoAlpha: 0, y: 30 });

      gsap.to(content, {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: acc,
          start: "top 45%", // shows as soon as the card is near center
          end: "bottom 45%", // hides as it leaves
          toggleActions: "play reverse play reverse",
          fastScrollEnd: true,
          ...stBase(),
        },
      });
    });

    // ====== 4) Refresh after images/fonts load so triggers are accurate ======
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // If images are still loading, refresh once more after load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    setTimeout(() => ScrollTrigger.refresh(), 50);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="w-full">
      <div className="projects flex flex-col items-center">
        {items.map((item) => (
          <div
            key={item.id}
            className="accordion w-full min-h-full p-6 overflow-hidden shadow-2xl flex flex-col justify-end bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
            }}
          >
            <div className="content bg-black/50 p-4 rounded-lg max-w-xl opacity-0">
              <span className="title text-[max(2vw,24px)] leading-[1.1] pb-2 text-white drop-shadow-md">
                {item.title}
              </span>
              <span className="text-white text-base">{item.description}</span>

              <div className="mt-4">
                <Link
                  to={`/work/${item.id}`}
                  className="inline-block bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  View Work
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
