import { useState, useRef } from "react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

export default function VideoPlayer({ src, className = "" }) {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleFullscreen = async () => {
    const videoEl = videoRef.current;
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

  return (
    <div className={`rounded-lg lg:rounded-[25px] overflow-hidden relative group ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      <button
        onClick={handleFullscreen}
        className="absolute bottom-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
      >
        <ArrowsPointingOutIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
