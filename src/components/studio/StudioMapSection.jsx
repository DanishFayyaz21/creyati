import React, { useState } from "react";
import StudioBookingForm from "./StudioBookingForm";

const StudioMapSection = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  return (
    <div className="studio-map-section bg-black text-white py-6 md:py-10 flex flex-col items-center min-h-screen px-4 md:px-6">
      <div className="w-full lg:w-4/5 relative group">
        <video
          // ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-[9/16] md:aspect-auto md:max-h-[80vh] rounded-lg object-cover object-top md:object-center"
          src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/studio/CREYETI+AD+CREATIVES+9-16.mp4"
        />

        {/* Hover overlay with booking button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
          <button
            onClick={() => setIsBookingFormOpen(true)}
            className="bg-white text-black px-8 py-2.5 lg:py-4 text-xs md:text-lg font-semibold rounded-lg hover:bg-gray-200 transition-colors transform scale-0 group-hover:scale-100 duration-300"
          >
            Book Studio
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isBookingFormOpen && (
        <StudioBookingForm onClose={() => setIsBookingFormOpen(false)} />
      )}

      <div className="w-full lg:w-4/5 bg-black text-gray-200 px-1 py-4 sm:px-6 md:px-8 rounded-lg">
        <div className="flex  md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-5">
          <h1 className="text-lg sm:text-3xl md:text-4xl font-bold text-white">
            Studio Parramatta
          </h1>
          <div className="flex items-center">
            <button
              onClick={() => setIsBookingFormOpen(true)}
              className="bg-white text-black px-5 py-2.5 md:px-6 md:py-3 text-xs whitespace-nowrap md:text-base font-semibold rounded-lg hover:bg-gray-200 transition-colors w-fit"
            >
              Book Studio
            </button>
          </div>
        </div>

        {/* Meta row (like top stats in the image) */}
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6 text-xs sm:text-sm text-gray-400">
          <div>
            <span className="block text-xs uppercase tracking-wide">Approx. floor space</span>
            <span className="text-white font-semibold">84m²</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wide">Capacity</span>
            <span className="text-white font-semibold">12 people</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wide">Ceiling height</span>
            <span className="text-white font-semibold">Very high (4m+)</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wide">Audience</span>
            <span className="text-white font-semibold">40</span>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
          Space overview
        </h2>

        <p className="mb-3 md:mb-4 text-sm sm:text-base text-gray-300">
          Studio Parramatta features expansive shooting spaces and an inviting
          atmosphere. Ideal for capturing stunning portraits, engaging product
          shots, dynamic fashion editorials, or compelling content for social
          media.
        </p>

        <p className="mb-3 md:mb-4 text-sm sm:text-base text-gray-300">
          Studio Parramatta is a big 84 meter square space featuring
          floor-to-ceiling door and window which makes the space very
          well-lit through the day. The space can also be blacked out with
          blackout curtains. The highlights of the space is its 4.5×4.5 m cyc
          wall, lots of options for backdrop rolls, and the 4×4 m pantograph.
        </p>

        <p className="mb-4 md:mb-6 text-sm sm:text-base text-gray-300">
          Studio Parramatta is tucked away in the vibrant corner of Firehorse
          Lane. About 2 mins on foot from Parramatta Train Station and
          plenty of parking available nearby, the space is conveniently
          accessible both by foot or vehicle. Lots of great food and coffee
          places around the studio.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
          Features and facilities
        </h2>

        <div className="mb-4 md:mb-6 text-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-white">Access features</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Load in access</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-white">Accessibility features</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Accessible public transport</li>
              <li>Accessible parking</li>
              <li>Accessible path to entrance</li>
              <li>Accessible toilets</li>
              <li>Adjustable lighting</li>
              <li>Alarm system</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-white">General features</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>CCTV Monitoring</li>
              <li>Change Room</li>
              <li>Natural Light</li>
              <li>Quiet space</li>
              <li>Wash up space</li>
              <li>24/7 access</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-white">Specialist features</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Backdrop rolls</li>
              <li>Concrete floors</li>
              <li>Hair and makeup area</li>
              <li>Large bins</li>
              <li>Lights on stands</li>
              <li>Reflector umbrellas</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
              Location
            </h2>

            <p className="font-semibold text-gray-300 text-sm">
              Address
            </p>
            <p className="text-gray-400 mb-3 text-sm">
              88 Church Street, Parramatta, 2150
            </p>

            <p className="font-semibold text-gray-300 text-sm">
              Access Hours
            </p>
            <p className="text-gray-400 text-sm">
              Open 24/7
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
              Getting here
            </h2>

            <p className="font-semibold text-gray-300 text-sm">
              Transport options
            </p>
            <p className="text-gray-400 mb-3 text-sm">
              Bus, Train, Tram
            </p>

            <p className="font-semibold text-gray-300 text-sm">
              Parking
            </p>
            <p className="text-gray-400 text-sm">
              One on-site parking spot. Parramatta Station Car Park next door.
            </p>
          </div>
        </div>
      </div>


      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.7218658658594!2d151.0044379!3d-33.81949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a39b9f956001%3A0x7a17a4128874c31f!2sStudio%20Parramatta!5e0!3m2!1sen!2s!4v1768995008583!5m2!1sen!2s"
        width="100%"
        height="300"
        className="rounded-lg w-full lg:w-4/5 h-[300px] md:h-[400px]"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Book Studio Button after map */}
      <div className="w-full lg:w-4/5 flex justify-center mt-6 md:mt-8">
        <button
          onClick={() => setIsBookingFormOpen(true)}
          className="bg-white text-black px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Book Studio
        </button>
      </div>

    </div>
  );
};

export default StudioMapSection;
