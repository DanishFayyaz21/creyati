import React from "react";

const LandscapeVideosRow = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px", // space between videos
        justifyContent: "center",
        flexWrap: "wrap", // allows stacking on very small screens
        padding: "20px",
      }}
    >
      {/* First Video */}
      <div
        style={{
          flex: "1 1 400px", // responsive width
          maxWidth: "480px",
          height: "270px", // 16:9 ratio
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <video
          src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/Homepage/services/social+media+new.mp4"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Second Video */}
      <div
        style={{
          flex: "1 1 400px",
          maxWidth: "480px",
          height: "270px",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <video
          src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/work-page/Cerroni/4.mp4"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default LandscapeVideosRow;
