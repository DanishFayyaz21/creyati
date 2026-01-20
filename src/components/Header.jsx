import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/images/creyeti-logo.webp";
import { hardScrollToTop } from "../utils/hardScrollToTop";
import SydneyClock from "./Clock";
// import ArrowIcon from "../assets/images/firm-arrow-btn.svg";
// import CheckCircle from "../assets/images/check-circle.svg";

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const contactBtnRef = useRef(null);
  const navListRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const clockRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Studio",
       path: "/studio", isExternal: false
    },
    { name: "Work", path: "/work", isExternal: false },
    { name: "About", path: "/about", isExternal: false },
    { name: "Services", path: "/services", isExternal: false },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return; // Exit if screen width is 767px or smaller

    let lastScrollY = window.scrollY;

    // Create a single timeline
    const timeline = gsap.timeline({ paused: true });

    // Define the animation sequence for scrolling down
    timeline
      .to(buttonWrapperRef.current, {
        width: "300px",
      })

      .to(
        contactBtnRef.current,
        {
          scale: 1,
          opacity: 1,
        },
        "<"
      )
      .to(
        navListRef.current,
        {
          opacity: 0,
          width: "0px",
          pointerEvents: "none",
          scale: 0.6,
          margin: "0px",
        },
        "<"
      );

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        timeline.play();
      } else if (currentScrollY < lastScrollY) {
        timeline.reverse();
      }

      lastScrollY = currentScrollY;
    };

    const debounceScroll = () => {
      clearTimeout(handleScroll.timer);
      handleScroll.timer = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debounceScroll);

    return () => {
      window.removeEventListener("scroll", debounceScroll);
    };
  }, []);

  return (
    <header
      className="py-5 md:p-5 fixed left-0 top-0 w-full z-[9999]"
      ref={headerRef}
    >
      <div
        className="relative max-w-[90%] md:max-w-fit w-full mx-auto rounded-[10px] 
      bg-[rgba(36,37,40,0.6)] p-2.5"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className="flex items-center justify-between gap-1">
          <Link
            to="/"
            className="w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <img src={Logo} alt="Logo" />
          </Link>

          <div className="flex md:hidden items-center justify-center w-full">
            <SydneyClock ref={clockRef} />
          </div>

          <button
            className="hamburger-menu md:hidden flex items-center justify-center w-10 h-10 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          <ul
            ref={navListRef}
            className={`nav-list mx-7 md:flex items-center gap-2.5 hidden`}
          >
            {navLinks.map((item) => (
              <li
                key={item.path}
                className="flex-none flex justify-center items-center py-2 px-2.5"
              >
                <Link
                  to={item.path}
                  target={item.isExternal ? "_blank" : undefined}
                  className="text-sm font-normal leading-none"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // ensure it jumps instantly before/after navigation
                    requestAnimationFrame(hardScrollToTop);
                  }}
                >
                  <span className="item1">{item.name}</span>
                  <span className="item2">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="hidden md:flex items-center justify-end overflow-hidden gap-2.5 w-[140px]"
            ref={buttonWrapperRef}
          >
            <div className="flex items-center justify-center">
              <SydneyClock ref={clockRef} />
            </div>
            <Link
              ref={contactBtnRef}
              to="/contact"
              className="btn h-9 flex items-center justify-center px-5 py-2 rounded-lg text-sm font-medium text-black leading-none bg-white flex-none"
            >
              <span className="relative z-[2]">Book a Call</span>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile menu start */}
      <div
        className={`absolute top-20 right-0 max-w-[90%] mx-auto w-full p-5  bg-[rgba(36,37,40,0.6)] border
             border-[rgba(255,255,255,0.10)] rounded-[14px] block transition-all duration-500 ease-in-out ${
               isMenuOpen
                 ? " opacity-100 left-0 right-0"
                 : " overflow-hidden opacity-0 right-[-100%]"
             } md:hidden`}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className="grid grid-cols-1 gap-2.5 pb-5 mb-5 border-b border-[rgba(255,255,255,0.10)]">
          {/* <Link
            to="/contact"
            onClick={() => {
              setIsMenuOpen(false);
              // ensure it jumps instantly before/after navigation
              requestAnimationFrame(hardScrollToTop);
            }}
            className="btn h-10 origin-right flex items-center justify-center px-4 py-2 rounded-lg text-xs font-medium text-white leading-none bg-[#111114] border border-[rgba(255,255,255,0.10)] flex-none"
          >
            <span className="relative z-[2]">Contact Us</span>
          </Link> */}
          {/* <div className="flex items-center justify-center">
            <SydneyClock ref={clockRef} />
          </div> */}
          <Link
            to="/contact"
            onClick={() => {
              setIsMenuOpen(false);
              // ensure it jumps instantly before/after navigation
              requestAnimationFrame(hardScrollToTop);
            }}
            className="btn h-10 flex items-center justify-center px-4 py-2 rounded-lg text-xs font-medium text-black leading-none bg-white border border-[rgba(255,255,255,0.10)] flex-none"
          >
            <span className="relative z-[2]">Book a Call</span>
            {/* <img src={ArrowIcon} alt="arrow-icon" /> */}
          </Link>
        </div>
        <ul className="flex flex-col gap-2.5 w-full mb-5">
          {navLinks.map((item) => (
            <li key={item.path} className="w-full">
              <Link
                to={item.path}
                className={`text-xs font-normal leading-none text-white px-3.5 py-2.5 rounded-lg w-full block border 
                    ${
                      pathname === item.path
                        ? " bg-[rgba(0,0,0,0.30)] border-[rgba(255,255,255,0.10)]"
                        : "border-transparent"
                    }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  // ensure it jumps instantly before/after navigation
                  requestAnimationFrame(hardScrollToTop);
                }}
              >
                <span className="">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="h-8 mx-3 mb-5 p-[1px] flex items-center justify-center rounded-[6px]"
          style={{
            background:
              "linear-gradient(170deg, rgba(25, 114, 245, 0) 9.32%, #fff 51.42%, rgba(25, 114, 245, 0) 93.51%)",
          }}
          onClick={() => {
            setIsMenuOpen(false);
            // ensure it jumps instantly before/after navigation
            requestAnimationFrame(hardScrollToTop);
          }}
        >
          <div
            className="flex items-center justify-center w-full h-full gap-2.5 text-[10px] font-normal 
            leading-none text-white bg-[#0A0A0A] border border-[rgba(25,114,245,0.00)] rounded-[7px]"
          >
            {/* <img src={CheckCircle} alt="check-circle" /> */}
            <span>Your Imagination Our Creativity</span>
          </div>
        </Link>
        {/* <Link
          to="/"
          onClick={() => {
            setIsMenuOpen(false);
            // ensure it jumps instantly before/after navigation
            requestAnimationFrame(hardScrollToTop);
          }}
          className="ml-auto w-9 h-9 flex items-center justify-center bg-[#1C3148] rounded-lg overflow-hidden"
        >
          <img src={Logo} alt="Logo" />
        </Link> */}
      </div>
      {/* mobile menu end */}
    </header>
  );
};

export default Header;
