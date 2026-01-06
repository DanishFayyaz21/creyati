import React from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import footerVideoSrc from "../assets/video/footer-vid.mp4";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={footerVideoSrc}
      />
      <div className="mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-800">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between py-12 pr-8 border-b md:border-b-0 md:border-r border-gray-800 w-[90%] ml-auto">
            {/* Logo + Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white text-black px-3 py-1 rounded font-bold text-sm tracking-widest">
                  CREYETI
                </div>
                <span className="text-xs uppercase text-white">
                  Look Like You Belong
                </span>
              </div>
              {/* Paragraph */}
              <p className="text-fill-white leading-relaxed max-w-md">
                Bold moves start here. At CREYETI, we work with entities and
                industries of all sizes, and from all over the globe, so reach
                out—let’s talk brand design, film production and help you to
                look like you belong.
              </p>
            </div>
            {/* Privacy & Legal */}
            <div className="mt-10 hidden gap-8 text-sm text-white md:flex">
              <a href="#" className="hover:text-white transition">
                PRIVACY POLICY
              </a>
              <a href="#" className="hover:text-white transition">
                LEGAL TERMS
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between py-12 pl-0 backdrop-blur-md bg-black/50">
            {/* Reach out */}
            <div className="border-b border-gray-800 pb-10 px-5 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <span className="text-gray-400">Reach out</span>
                <a
                  href="mailto:prayush@creyeti.com.au"
                  className="text-white font-medium hover:opacity-80 transition flex items-center gap-2"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  wegotyou@creyeti.com.au
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="border-b border-gray-800 py-10 px-5 md:px-8 md:min-h-80">
              <p className="font-bold text-fill-white">Studio Parramatta</p>
              <p className="text-fill-white">
                Shop 8/88 Church St Parramatta,
                <br />
                NSW 2150
              </p>
            </div>

            {/* Sitemap & Social */}
            <div className="pt-10 px-5 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <span className="text-gray-400">Site Map</span>
                <div className="flex flex-wrap gap-x-16 gap-y-4">
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://studioparramatta.com.au/"
                      target="_blank"
                      className="hover:opacity-80"
                    >
                      STUDIO
                    </a>
                    <Link to="/work" className="hover:opacity-80">
                      WORK
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to="/about" className="hover:opacity-80">
                      ABOUT
                    </Link>
                    <Link to="/services" className="hover:opacity-80">
                      SERVICES
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* <a href="#" className="hover:opacity-80">
                      LINKEDIN
                    </a> */}
                    <a
                      href="https://www.instagram.com/creyeti/"
                      target="_blank"
                      className="hover:opacity-80"
                    >
                      INSTAGRAM
                    </a>
                    {/* <a href="#" className="hover:opacity-80">
                      YOUTUBE
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-10 block md:hidden" />
            <div className="mt-5 px-5 justify-center flex gap-8 text-sm text-white md:hidden">
              <a href="#" className="hover:text-white transition">
                PRIVACY POLICY
              </a>
              <a href="#" className="hover:text-white transition">
                LEGAL TERMS
              </a>
            </div>
            {/* Copyright */}
            <div className="mt-10 text-gray-500 text-sm pl-8">
              Copyright © {new Date().getFullYear()} CREYETI. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
