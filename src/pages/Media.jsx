import { useParams } from "react-router-dom";
import { siteData } from "../data";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

export default function Media() {
  const { slug } = useParams();
  const project = siteData.portfolio.projects.find((p) => p.slug === slug);
  const videoRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("still");

  if (!project) {
    return <div className="text-white text-center py-20">Media not found</div>;
  }

  const handleFullscreen = async (videoEl) => {
    if (!videoEl) return;

    try {
      if (videoEl.requestFullscreen) {
        await videoEl.requestFullscreen();
      } else if (videoEl.webkitRequestFullscreen) {
        await videoEl.webkitRequestFullscreen();
      } else if (videoEl.webkitEnterFullscreen) {
        videoEl.webkitEnterFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const gallery = project.gallery || [];
  const videos = Array.isArray(project.videos)
    ? project.videos
    : Array.isArray(project.video)
    ? project.video
    : project.video
    ? [project.video]
    : [];

  return (
    <div className="bg-black text-white min-h-screen py-28">
      <div className="container">
        <div className="flex justify-center items-center mb-6">
          <img
            src={project.logo}
            alt={project.title}
            className="max-w-[220px] w-full"
          />
        </div>

        <div className="flex justify-center gap-6 mb-14 flex-wrap">
          {["still", "video"].map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn uppercase max-w-fit transition-all duration-300
          ${
            isActive
              ? "bg-white text-black"
              : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
          }`}
              >
                {tab === "still" ? "Still" : "Videos"}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "still" && (
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-3"
            >
              {gallery.length >= 3 && (
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 lg:col-span-5">
                    <img
                      src={gallery[0]}
                      alt="media-0"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                    />
                  </div>

                  <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                    <img
                      src={gallery[1]}
                      alt="media-1"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                    />
                    <img
                      src={gallery[2]}
                      alt="media-2"
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover"
                    />
                  </div>
                </div>
              )}
              {gallery.length >= 5 && (
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6 lg:col-span-5">
                    <img
                      src={gallery[3]}
                      alt="media-3"
                      className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-6 lg:col-span-7">
                    <img
                      src={gallery[4]}
                      alt="media-4"
                      className="rounded-lg lg:rounded-[25px] w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              {gallery.length > 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {gallery.slice(5).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`media-${index + 5}`}
                      className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[350px] object-cover"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "video" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col gap-10"
            >
              {videos.length > 0 ? (
                Array.from({ length: Math.ceil(videos.length / 2) }).map((_, rowIndex) => {
                  const first = videos[rowIndex * 2];
                  const second = videos[rowIndex * 2 + 1];

                  return (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                    >
                      {/* 35% */}
                      {first && (
                        <div className="lg:col-span-4 rounded-lg lg:rounded-[25px] overflow-hidden relative group">
                          <video
                            ref={(el) => (videoRefs.current[rowIndex * 2] = el)}
                            src={first}
                            muted
                            playsInline
                            loop
                            className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover"
                          />

                          {/* Fullscreen Button */}
                          <button
                            onClick={() => handleFullscreen(videoRefs.current[rowIndex * 2])}
                            className="absolute bottom-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                          >
                            <ArrowsPointingOutIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      {/* 65% */}
                      {second && (
                        <div className="lg:col-span-8 rounded-lg lg:rounded-[25px] overflow-hidden relative group">
                          <video
                            ref={(el) => (videoRefs.current[rowIndex * 2 + 1] = el)}
                            src={second}
                            muted
                            playsInline
                            loop
                            className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover"
                          />

                          <button
                            onClick={() => handleFullscreen(videoRefs.current[rowIndex * 2 + 1])}
                            className="absolute bottom-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                          >
                            <ArrowsPointingOutIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-white/60">No videos available.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
