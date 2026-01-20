import React from "react";

const LandscapeVideosRow = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Top Row: 3 Videos Side by Side */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* First Video */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            height: "225px",
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Second Video */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            height: "225px",
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Third Video */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            height: "225px",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <video
            src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/work-page/masal.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Middle: Full Width Video */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "675px",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <video
          src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/work-page/beyond+labs/1+Gym+Motivation+V2+_06.mp4"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Bottom Row: 3 Videos Side by Side */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* First Bottom Video */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            height: "225px",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <video
            src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/work-page/Barberindustries/videos/BEFORE+AND+AFTERS_1.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Second Bottom Video */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            height: "225px",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <video
            src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/Homepage/services/branding+new.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Third Bottom Video */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            height: "225px",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <video
            src="https://creyeti-assets-bucket.s3.ap-southeast-2.amazonaws.com/work-page/harpah.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandscapeVideosRow;
