import React, { useState } from "react";

const StudioBookingForm = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div style={pageWrapper}>
      {/* LEFT FORM */}
      <form style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Book Your Studio</h2>

        <input
          type="text"
          placeholder="Your Name"
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Your Email"
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Selected Date"
          value={selectedDate}
          readOnly
          style={inputStyle}
        />

        <textarea
          placeholder="Add a note"
          rows="4"
          style={inputStyle}
        ></textarea>

        <button style={buttonStyle}>Book Now</button>
      </form>

      {/* RIGHT FIXED CALENDAR */}
      <div style={calendarWrapper}>
        <h3>Select Date</h3>

        <input
          type="date"
          style={calendarInput}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */

const pageWrapper = {
  display: "flex",
  backgroundColor: "#000",
  color: "#fff",
  minHeight: "100vh",
  padding: "40px",
  gap: "40px",
};

const formStyle = {
  flex: 1,
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  backgroundColor: "#111",
  padding: "30px",
  borderRadius: "12px",
};

const inputStyle = {
  backgroundColor: "transparent",
  border: "1px solid #444",
  padding: "12px",
  color: "#fff",
  borderRadius: "6px",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#fff",
  color: "#000",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
};

/* ---------- FIXED CALENDAR ---------- */

const calendarWrapper = {
  position: "sticky", // 🔥 FIXED ON SCROLL
  top: "40px",
  width: "280px",
  height: "fit-content",
  backgroundColor: "#111",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
};

const calendarInput = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#000",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "6px",
};

export default StudioBookingForm;
