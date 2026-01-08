import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { siteData } from "../data";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import PortfolioNavigation from "../components/work/PortfolioNavigation";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = siteData.portfolio.projects.find((p) => p.slug === slug);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!isFullscreen) {
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          await video.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          // iOS Safari specific
          video.webkitEnterFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (video.webkitExitFullscreen) {
          // iOS Safari doesn’t support exit, user must tap "done"
          video.webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!project) {
    return <div className="text-white text-center py-20">Project not found</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen py-28">
      <div className="container">
        {/* Title */}
        {/* <h1 className="text-5xl font-bold text-center mb-10">
          {project.title}
        </h1> */}
        <div className="flex justify-center items-center mb-10">
          <img
            src={project.logo}
            alt={project.title}
            className="max-w-[250px] w-full"
          />
        </div>

        {/* Top Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 max-w-[930px] w-full mx-auto mb-10">
          <div className="border rounded-[20px] px-6 py-3 min-h-[76px] lg:min-h-[118px] flex flex-col justify-center items-start lg:items-center gap-2 lg:gap-4">
            <span className="text-base font-bold leading-none flex items-center justify-center uppercase">
              <ChevronRightIcon className="w-6 h-6" /> Clients
            </span>
            <span className="text-base font-normal leading-none font-urbanist">{project.client}</span>
          </div>
          <div className="border rounded-[20px] px-6 py-3 min-h-[76px] lg:min-h-[118px] flex flex-col justify-center items-start lg:items-center gap-2 lg:gap-4">
            <span className="text-base font-bold leading-none flex items-center justify-center uppercase">
              <ChevronRightIcon className="w-6 h-6" /> Timeline
            </span>
            <span className="text-base font-normal leading-none font-urbanist">{project.timeline}</span>
          </div>
          <div className="border rounded-[20px] px-6 py-3 min-h-[76px] lg:min-h-[118px] flex flex-col justify-center items-start lg:items-center gap-2 lg:gap-4">
            <span className="text-base font-bold leading-none flex items-center justify-center uppercase">
              <ChevronRightIcon className="w-6 h-6" /> deliverables
            </span>
            <span className="text-base font-normal leading-none font-urbanist">{project.deliverables.join(", ")}</span>
          </div>
        </div>

        {/* Cover Video */}
        {/* <img
          src={project.image}
          alt={project.title}
          className="rounded-2xl w-full max-h-[620px] object-cover mb-10"
        /> */}
        <div className="rounded-2xl overflow-hidden mb-10 relative">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[235px] md:max-h-[620px] object-cover object-top md:object-center"
            src={project.video}
          />

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 group"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <XMarkIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Work Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
          <div className="lg:col-span-7 border-[0.5px] border-white px-12 py-7">
            <h2 className="text-[22px] font-normal uppercase lg:text-3xl text-fill-white mb-3">BRIEF</h2>
            <p className="text-fill-white">{project.ourWork}</p>
          </div>
          <div className="lg:col-span-5 border-[0.5px] border-white px-12 py-7">
            <h2 className="text-[22px] font-normal uppercase lg:text-3xl text-fill-white mb-3">Type of Work</h2>
            <span className="text-base font-normal leading-none text-white mb-5">{project.campaign}</span>
            {project.typeOfWork.map((item, idx) => (
              <p
                className="text-fill-white"
                key={idx}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10 mb-16">
          {/* Gallery */}
          <div className="lg:col-span-9 grid gap-3">
            {/* Row 1: 3 images */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src={project.gallery[0]}
                  alt="img-0"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                />
              </div>
              <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                <img
                  src={project.gallery[1]}
                  alt="img-1"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                />
                <img
                  src={project.gallery[2]}
                  alt="img-2"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                />
              </div>
            </div>

            {/* Row 2: 2 images */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 lg:col-span-5">
                <img
                  src={project.gallery[3]}
                  alt="img-4"
                  className="rounded-lg lg:rounded-[25px] w-full h-full object-cover object-top"
                />
              </div>
              <div className="col-span-6 lg:col-span-7">
                <img
                  src={project.gallery[4]}
                  alt="img-5"
                  className="rounded-lg lg:rounded-[25px] w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Row 3: 3 images */}
            <div className="grid grid-cols-12 gap-3">
              {/* Full-width image on md and up */}
              <div className="col-span-12 lg:col-span-4">
                <img
                  src={project.gallery[5]}
                  alt="img-6"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[400px] md:max-h-[300px] object-cover md:object-top"
                />
              </div>

              {/* Two side-by-side images */}
              <div className="col-span-6 lg:col-span-4">
                <img
                  src={project.gallery[6]}
                  alt="img-7"
                  className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[300px] object-cover object-top"
                />
              </div>
              <div className="col-span-6 lg:col-span-4 relative rounded-lg lg:rounded-[25px] overflow-hidden max-h-[300px]">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop
                  className="w-full h-full z-10"
                >
                  {project.gallery.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`gallery-slide-${index}`}
                        className="w-full h-full max-h-[300px] object-cover object-top"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/70 pointer-events-none">
                  <span className="text-white text-lg font-semibold uppercase tracking-wide">Show More</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h5 className="text-xl leading-none text-fill-white font-normal mb-2">{project.timelime}</h5>

            <p className="text-fill-white font-urbanist mb-12">
              <b>{project.stage}</b> <br /> {project.stageDetail}
            </p>

            <ul className="relative font-urbanist space-y-16">
              {project.phases && project.phases.length > 0 ? (
                project.phases.map((item, index) => (
                  <li
                    key={index}
                    className="relative pl-8"
                  >
                    {/* Dot */}
                    <div className="absolute -left-3 top-0 w-[22px] h-[22px] bg-white rounded-full"></div>
                    {/* Vertical line (below the dot, hidden on last) */}
                    <div
                      className={`absolute left-[-2px] top-[22px] w-[2px] h-[calc(100%+3rem)] bg-white ${
                        index === project.phases.length - 1 ? "hidden" : ""
                      }`}
                    ></div>
                    {/* Content */}
                    <b>{item.title}</b> {item.desc}
                  </li>
                ))
              ) : (
                <p className="text-white italic">No expectations available.</p>
              )}
            </ul>

            {/* <ul className="relative font-urbanist border-l-2 border-white space-y-16"> */}
            {/* Phases */}
            {/* {project.phases && project.phases.length > 0 ? (
                <ul className="relative font-urbanist border-l-2 border-white space-y-16">
                  {project.phases.map((item, index) => (
                    <li key={index} className="relative pl-8">
                      <div className="absolute -left-3 top-0 w-[22px] h-[22px] bg-white rounded-full"></div>
                      <b>{item.title}</b> {item.desc}
                    </li>
                    // <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-white italic">No expectations available.</p>
              )} */}

            {/* <li className="relative pl-8">
                <div className="absolute -left-3 top-0 w-[22px] h-[22px] bg-white rounded-full"></div>
                <b>Phase 1 – Strategy and Concept</b>
                <br />
                Developed a campaign concept rooted in storytelling. Crafted ad
                copy and messaging to resonate with the target audience.
                Outlined visual direction to unify the campaign across all
                platforms.
              </li> */}

            {/* Phase 2 */}
            {/* <li className="relative pl-8">
                <div className="absolute -left-3 top-0 w-[22px] h-[22px] bg-white rounded-full"></div>
                <b>Phase 2 – Media Production</b>
                <br />
                Produced ad creatives, including photography and videography.
                Created content packs tailored for social media and website use.
                Ensured visuals aligned with the campaign's tone and brand
                positioning.
              </li> */}

            {/* Phase 3 */}
            {/* <li className="relative pl-8">
                <div className="absolute -left-3 top-0 w-[22px] h-[22px] bg-white rounded-full"></div>
                <b>Phase 3 – Campaign Launch</b>
                <br />
                Deployed ads across relevant platforms. Optimized content for
                maximum reach and engagement. Integrated messaging across
                social, website, and paid media.
              </li> */}

            {/* Phase 4 */}
            {/* <li className="relative pl-8">
                <div className="absolute -left-3 top-0 w-[22px] h-[22px] bg-white rounded-full"></div>
                <b>Phase 4 – Growth & Visibility</b>
                <br />
                Within 2 weeks, the campaign exploded in visibility, reaching
                over 1.6 million viewers and outperforming competitors’ ads by
                40% in engagement rates.
              </li> */}
            {/* </ul> */}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
          <div className="lg:col-span-7 grid lg:grid-cols-2 gap-10 border-[0.5px] border-white px-12 py-7">
            <h2 className="text-[22px] font-normal uppercase lg:text-3xl text-fill-white mb-3">DELIVERABLES</h2>
            {project.deliverablesDetail && project.deliverablesDetail.length > 0 ? (
              <ul className="list-disc list-inside space-y-3 text-white font-urbanist">
                {project.deliverablesDetail.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white italic">No expectations available.</p>
            )}
            {/* <p className="text-fill-white">
              Concept and Copywriting Campaign story and creative messaging. Ad
              copy designed to convert.
              <br />
              <br />
              Media Production High quality photography Campaign video
              production Visual assets optimized for website and social media.
              <br />
              <br />
              Campaign Execution Paid ads management Social integration and
              rollout strategy End-to-end creative direction.
            </p> */}
          </div>
          <div className="lg:col-span-5 border-[0.5px] border-white px-12 py-7">
            <h2 className="text-[22px] font-normal uppercase lg:text-3xl text-fill-white mb-8">RESULTS</h2>
            {project.resultsDetail && project.resultsDetail.length > 0 ? (
              <ul className="list-disc list-inside space-y-3 text-white font-urbanist">
                {project.resultsDetail.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white italic">No expectations available.</p>
            )}
            {/* <div className="grid lg:grid-cols-2 gap-10">
              <p className="text-fill-white">
                <b>Before Campaign:</b>
                <br />
                $9000/fortnight in sales
              </p>
              <p className="text-fill-white">
                <b>After Campaign:</b>
                <br />
                $48,000/fortnight in sales Visibility: 1.6 million viewers in 2
                weeks, 40% higher engagement than competitors. ROI: 5x on total
                marketing spend ($10,000 - $48,000+) Sales uplift: Over 400%
              </p>
            </div> */}
          </div>
        </div>

        {/* Portfolio Navigation */}
        <PortfolioNavigation currentSlug={slug} />
      </div>
    </div>
  );
}
