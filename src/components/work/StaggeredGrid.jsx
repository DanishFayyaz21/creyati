import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import product1 from "../../assets/images/products/product-1.webp";
import product2 from "../../assets/images/products/product-2.webp";
import product3 from "../../assets/images/products/product-3.webp";
import product4 from "../../assets/images/products/product-4.webp";
import product5 from "../../assets/images/products/product-5.webp";
import product6 from "../../assets/images/products/product-6.webp";
import product7 from "../../assets/images/products/product-7.webp";
import product8 from "../../assets/images/products/product-8.webp";

gsap.registerPlugin(ScrollTrigger);

// ✅ Export data for WorkDetail
export const items = [
  { id: 1, title: "Work One", img: product8, description: "This is a detailed description about Work One." },
  { id: 2, title: "Work Two", img: product2, description: "This is a detailed description about Work Two." },
  { id: 3, title: "Work Three", img: product3, description: "This is a detailed description about Work Three." },
  { id: 8, title: "Work Eight", img: product5, description: "This is a detailed description about Work Eight." },
  { id: 4, title: "Work Four", img: product4, description: "This is a detailed description about Work Four." },
  { id: 5, title: "Work Five", img: product6, description: "This is a detailed description about Work Five." },
  { id: 6, title: "Work Six", img: product1, description: "This is a detailed description about Work Six." },
  { id: 7, title: "Work Seven", img: product7, description: "This is a detailed description about Work Seven." },
];

// ✅ Keep your col-span pattern
const colSpanPattern = [
  "md:col-span-3",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-2",
];

const StaggeredGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const q = gsap.utils.selector(gridRef);

    q(".grid-item").forEach((item) => {
      gsap.fromTo(
        item,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 50%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="container mx-auto py-12">
      <div
        ref={gridRef}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          gap-6
          w-full
        "
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`
              grid-item
              relative
              overflow-hidden
              opacity-100
              group
              transition-transform duration-300
              hover:-translate-y-2
              ${colSpanPattern[idx % colSpanPattern.length]}
            `}
            style={{ minHeight: "22rem", opacity: 1 }}
          >
            {/* ✅ Only inner content wrapped with Link, grid stays same */}
            <Link to={`/work/${item.id}`} className="w-full h-full block">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{ minHeight: "22rem", maxHeight: "40rem" }}
              />
              <div
                className="
                  absolute inset-0
                  bg-black/60
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <span className="text-white text-2xl font-bold text-center px-4">
                  {item.title}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaggeredGrid;
