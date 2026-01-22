import React, { useState } from "react";

const StudioBookingForm = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    dates.push(d);
  }

  const changeMonth = (value) => {
    setCurrentMonth(new Date(year, month + value, 1));
  };

  const selectDate = (day) => {
    if (!day) return;
    const fullDate = `${year}-${month + 1}-${day}`;
    setSelectedDate(fullDate);
  };

  return (
    <div style={wrapper}>
      {/* FORM */}
      <form style={form}>
        <h2>Book Your Studio</h2>

        <input placeholder="Your Name" style={input} />
        <input placeholder="Your Email" style={input} />

        <input
          placeholder="Selected Date"
          value={selectedDate}
          readOnly
          style={input}
        />

        <textarea placeholder="Note" rows="4" style={input} />

        <button style={button}>Book Now</button>
      </form>

      {/* CALENDAR */}
      <div style={calendar}>
        <div style={calendarHeader}>
          <button onClick={() => changeMonth(-1)} style={navBtn}>‹</button>
          <h3>
            {currentMonth.toLocaleString("default", { month: "long" })} {year}
          </h3>
          <button onClick={() => changeMonth(1)} style={navBtn}>›</button>
        </div>

        <div style={daysGrid}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} style={dayName}>{d}</div>
          ))}

          {dates.map((day, i) => (
            <div
              key={i}
              onClick={() => selectDate(day)}
              style={{
                ...dayBox,
                background:
                  selectedDate.endsWith(`-${day}`) ? "#fff" : "#111",
                color:
                  selectedDate.endsWith(`-${day}`) ? "#000" : "#fff",
                cursor: day ? "pointer" : "default",
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- STYLES ---------- */

const wrapper = {
  display: "flex",
  gap: "40px",
  padding: "40px",
  background: "#000",
  color: "#fff",
  minHeight: "100vh",
};

const form = {
  width: "400px",
  background: "#111",
  padding: "30px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const calendar = {
  width: "400px",
  background: "#111",
  padding: "20px",
  borderRadius: "12px",
  position: "sticky",
  top: "40px",
};

const input = {
  background: "transparent",
  border: "1px solid #444",
  padding: "12px",
  color: "#fff",
  borderRadius: "6px",
};

const button = {
  background: "#fff",
  color: "#000",
  padding: "12px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const calendarHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const navBtn = {
  background: "#222",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
};

const daysGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "10px",
};

const dayName = {
  textAlign: "center",
  fontSize: "12px",
  opacity: 0.7,
};

const dayBox = {
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  background: "#111",
};

export default StudioBookingForm;
