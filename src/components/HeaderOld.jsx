import React from "react";

const HeaderOld = () => {
  const Navlinks = [
    { name: "Studio", path: "/" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <header className="absolute left-0 top-0 w-full z-50 text-white py-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <a href="/" className="text-lg font-bold leading-none capitalize">
            creyeti
          </a>
          <nav>
            <ul className="flex items-center gap-4">
              {Navlinks.map((link, index) => (
                <li>
                  <a
                    key={index}
                    href={link.path}
                    className="text-base font-semibold hover:text-gray-300 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center">
            <a href="/" className="text-base font-semibold bg-white text-black px-8 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors duration-300 capitalize">
              book a call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOld;
