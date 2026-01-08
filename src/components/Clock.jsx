import React, { useEffect, useState, forwardRef } from "react";

const SydneyClock = forwardRef((props, ref) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const sydneyTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Australia/Sydney" })
      );

      const hours = String(sydneyTime.getHours()).padStart(2, "0");
      const minutes = String(sydneyTime.getMinutes()).padStart(2, "0");
      const seconds = String(sydneyTime.getSeconds()).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
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
});

export default SydneyClock;
