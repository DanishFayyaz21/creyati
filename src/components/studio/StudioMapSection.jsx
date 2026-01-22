import React from "react";

const StudioMapSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "40px 20px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "600",
          textAlign: "center",
          color: "#111",
        }}
      >
        Book Your Studio
      </h2>

      {/* Google Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26517.774926926875!2d150.98383853476557!3d-33.819489999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768968078443!5m2!1sen!2s"
        width="100%"
        height="450"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default StudioMapSection;
