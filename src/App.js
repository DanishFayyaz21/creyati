import React, { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import Loader from "./components/Loader"; // 👈 import Loader
import FloatingConsultation from "./components/FloatingConsultation";

function App() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [loading, setLoading] = useState(true); // 👈 loader state

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtTop) {
      // Scroll to the first section below the current view
      const sections = document.querySelectorAll("section");
      for (let section of sections) {
        const sectionTop = section.offsetTop;
        if (sectionTop > 10) {
          window.scrollTo({ top: sectionTop, behavior: "smooth" });
          break;
        }
      }
    } else {
      // Scroll back to the very top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />} {/* 👈 show loader */}

      {!loading && (
        <>
          {/* Scroll Arrow */}
          <div
            onClick={handleClick}
            className="arrow-top fixed bottom-4 right-4 z-50 w-12 h-12 flex items-center justify-center cursor-pointer 
                   bg-black/80 text-white rounded-full shadow-lg hover:bg-gray-700 
                   transition-all duration-300 transform hover:scale-110"
          >
            {isAtTop ? (
              <ArrowDownIcon className="w-6 h-6 text-white" />
            ) : (
              <ArrowUpIcon className="w-6 h-6 text-white" />
            )}
          </div>

          <SmoothScroll />
          <ScrollToTop />
          <FloatingConsultation />
          <Header />
          <AppRoutes />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
