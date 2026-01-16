import { useParams } from "react-router-dom";
import { siteData } from "../data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "../components/VideoPlayer";

export default function Media() {
  const { slug } = useParams();
  const project = siteData.portfolio.projects.find((p) => p.slug === slug);

  const [activeTab, setActiveTab] = useState("still");

  if (!project) {
    return <div className="text-white text-center py-20">Media not found</div>;
  }

  const gallery = (project.gallery || []).slice().reverse();


  const videos = Array.isArray(project?.videos)
    ? project?.videos
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

        {slug !== "beyond-labs" && (
          <div className="flex justify-center gap-6 mb-14 flex-wrap sticky top-28 z-10">
            {["still", "video"].map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`btn uppercase max-w-fit transition-all duration-300
            ${isActive
                      ? "bg-white text-black"
                      : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
                    }`}
                >
                  {tab === "still" ? "Still" : "Videos"}
                </button>
              );
            })}
          </div>
        )}

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
              {Array.from({ length: Math.ceil(gallery.length / 5) }).map((_, groupIndex) => {
                const startIndex = groupIndex * 5;
                const groupImages = gallery.slice(startIndex, startIndex + 5);

                return (
                  <div key={groupIndex} className="grid gap-3">
                    {/* First row: 1 large image + 2 stacked images */}
                    {groupImages.length >= 1 && (
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 lg:col-span-5">
                          <img
                            src={groupImages[0]}
                            alt={`media-${startIndex}`}
                            className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover object-top"
                          />
                        </div>

                        {groupImages.length >= 2 && (
                          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-3">
                            <img
                              src={groupImages[1]}
                              alt={`media-${startIndex + 1}`}
                              className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover object-top"
                            />
                            {groupImages[2] && (
                              <img
                                src={groupImages[2]}
                                alt={`media-${startIndex + 2}`}
                                className="rounded-lg lg:rounded-[25px] w-full h-full max-h-[576px] object-cover object-top"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Second row: 2 images side by side */}
                    {groupImages.length >= 4 && (
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-6 lg:col-span-5">
                          <img
                            src={groupImages[3]}
                            alt={`media-${startIndex + 3}`}
                            className="rounded-lg lg:rounded-[25px] w-full h-full object-cover object-top"
                          />
                        </div>
                        {groupImages[4] && (
                          <div className="col-span-6 lg:col-span-7">
                            <img
                              src={groupImages[4]}
                              alt={`media-${startIndex + 4}`}
                              className="rounded-lg lg:rounded-[25px] w-full h-full object-cover object-top"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
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
                      {first && (
                        <VideoPlayer src={first} className="lg:col-span-4" />
                      )}

                      {second && (
                        <VideoPlayer src={second} className="lg:col-span-8" />
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
