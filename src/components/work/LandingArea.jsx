import React from "react";

const LandingArea = () => {
  return (
    <section className="lg:pt-10 lg:pb-10 bg-black flex justify-center items-center relative overflow-hidden">
      <div className="relative w-full max-h-[450px] flex justify-center items-center">
        <h1 className="mt-10 sm:mt-0 lg:mt-10">
          <span className="text-container">
            <video autoPlay loop muted playsInline className="bg-video">
              <source
                src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/work-page/TITLE.mp4"
                type="video/mp4"
              />
            </video>

            <span className="text stroke">WORK</span>

            <span className="text blend">WORK</span>
          </span>
        </h1>

        <style >{`
          .text-container {
            position: relative;
            width: 100vw;
            height: 100%;
          }

          .text-container > .bg-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .text {
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
            font-weight: 900;
            font-size: 28.23vw;
            font-family: arial, sans-serif;
            user-select: none;
          }

          /* Stroke layer (behind, no blending) */
          .text.stroke {
            color: transparent;
            -webkit-text-stroke: 2px white; /* adjust thickness */
            z-index: 1;
          }

          /* Fill layer (in front, blends with video) */
          .text.blend {
            background-color: #000;
            color: #fff;
            -webkit-text-fill-color: white;
            mix-blend-mode: multiply;
            z-index: 2;
          }
        `}</style>
      </div>
    </section>
  );
};

export default LandingArea;
