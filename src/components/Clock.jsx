import React, { useEffect, useState } from "react";

const SydneyClock = ({ ref }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Convert to Sydney time
      const sydneyTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
      );

      // Format HH:MM:SS manually
      const hours = String(sydneyTime.getHours()).padStart(2, "0");
      const minutes = String(sydneyTime.getMinutes()).padStart(2, "0");
      const seconds = String(sydneyTime.getSeconds()).padStart(2, "0");

      // Calculate GMT offset in hours
      const offsetMinutes = -sydneyTime.getTimezoneOffset(); // in minutes
      const offsetSign = offsetMinutes >= 0 ? "+" : "-";
      const offsetHours = String(
        Math.floor(Math.abs(offsetMinutes) / 60)
      ).padStart(2, "0");
      const offsetMins = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");

      const offset = `GMT${offsetSign}${offsetHours}:${offsetMins}`;

      setTime(`${hours}:${minutes}:${seconds}`);
      // setTime(`${hours}:${minutes}:${seconds} (${offset})`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}
      className="text-sm w-[150px] font-mono text-gray-200 shadow-sm flex items-center justify-center"
    >
      SYD | {time}
    </div>
  );
};

export default SydneyClock;
