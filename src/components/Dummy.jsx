import React from "react";

const Dummy = () => {
  return (
    <div className="lg:col-span-9 grid gap-3 pt-16">
      {/* Row 1: 3 images */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-5">
          <img
            src={service.gallery[0]}
            alt="img-0"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
          />
        </div>
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
          <img
            src={service.gallery[1]}
            alt="img-1"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
          />
          <img
            src={service.gallery[2]}
            alt="img-2"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
          />
        </div>
      </div>

      {/* Row 2: 2 images */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 lg:col-span-5">
          <img
            src={service.gallery[3]}
            alt="img-4"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
          />
        </div>
        <div className="col-span-6 lg:col-span-7">
          <img
            src={service.gallery[4]}
            alt="img-5"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
          />
        </div>
      </div>

      {/* Row 3: 3 images */}
      <div className="grid grid-cols-12 gap-3">
        {/* Full-width image on md and up */}
        <div className="col-span-12 lg:col-span-4">
          <img
            src={service.gallery[5]}
            alt="img-6"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[400px] md:max-h-[300px] object-cover md:object-top"
          />
        </div>

        {/* Two side-by-side images */}
        <div className="col-span-6 lg:col-span-4">
          <img
            src={service.gallery[6]}
            alt="img-7"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
          />
        </div>
        <div className="col-span-6 lg:col-span-4">
          <img
            src={service.gallery[7]}
            alt="img-8"
            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default Dummy;
