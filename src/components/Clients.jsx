import React, { useEffect, useState } from "react";
import { siteData } from "../data";

const Clients = () => {
  const { clients: clientsData } = siteData;
  const [clients, setClients] = useState(clientsData.list);
  const [visibleClients, setVisibleClients] = useState(clientsData.list.slice(0, 8));
  const [fadeOut, setFadeOut] = useState(false);

  // shuffle helper
  const shuffleArray = (arr) => {
    let newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setClients((prev) => {
          const shuffled = shuffleArray(prev);
          setVisibleClients(shuffled.slice(0, 8));
          setFadeOut(false);
          return shuffled;
        });
      }, 500); // duration of fade-out transition
    }, 3000); // shuffle every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-20 pb-0 bg-black">
      <div className="container">
        <div className="mb-10">
          <h2 className="heading2 text-center text-fill-white">
            {clientsData.title}
          </h2>
        </div>
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-4 border md:border-y border-white/30 transition-all duration-500 w-[91%] mx-auto md:w-[100%]">
        {visibleClients.map((item) => (
          <li
            key={item.logo} // stable key since you shuffle
            className="
        flex justify-center items-center h-[140px] md:min-h-[250px] md:h-full p-5
        border-b border-r border-white/30
        [&:nth-child(2n)]:border-r-0
        lg:[&:nth-child(2n)]:border-r
        lg:[&:nth-child(4n)]:border-r-0
        [&:nth-last-child(-n+2)]:border-b-0
        lg:[&:nth-last-child(-n+4)]:border-b-0
      "
          >
            <img
              src={item.logo}
              alt={item.name}
              loading="lazy"
              className="w-full max-w-[100px] md:max-w-[200px] object-contain" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Clients;
