const { m } = require('framer-motion')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customWhite: "#FDFEFE",
        customGray: "#CFD6D3",
        customGreen: "#0EF3A5",
        customDark: "#131414",
        customDarkGreen: "#0B5B40",
        customLightGreen: "#F7FEFB",
        customTransparentWhite: "rgba(255, 255, 255, 0.05)",
        primaryLight: "rgba(11, 172, 117, 0.05)",
        darkGray: "rgba(49, 60, 56, 0.40)",
        horizontalLine: "rgba(146, 39, 253, 0.00)", // ✅ Added custom border color
      },
      borderColor: {
        horizontalLine: "rgba(146, 39, 253, 0.00)", // ✅ Added as border color
      },
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      backgroundImage: {
        "white-gradient": "linear-gradient(180deg, #fff0, #fff)",
        "black-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 10) 100%)",
        "line-bg":
          "radial-gradient(59.99% 50% at 50% 50%, #0EF3A5 0%, rgba(14, 243, 165, 0.00) 100%)",
        divider:
          "radial-gradient(45.99% 50% at 50% 50%, #0EF3A5 0%, rgba(14, 243, 165, 0.00) 100%)",
        "sec-radial":
          "radial-gradient(35.99% 43% at 50% -23%, rgba(14, 243, 165, 0.29) 0%, rgba(14, 243, 165, 0) 100%), linear-gradient(180deg, rgba(14, 243, 165, 0.02) 0%, rgba(14, 243, 165, 0.02) 100%)",
        "btn-bg":
          "linear-gradient(180deg, rgba(11, 49, 36, 0.20) 0%, rgba(15, 164, 113, 0.20) 100%)",
        "card-bg":
          "linear-gradient(180deg, rgba(13, 36, 28, 0.15) 0%, rgba(14, 243, 165, 0.15) 100%), radial-gradient(circle 207px at 8% 0, rgb(14 243 165 / 30%) 0%, transparent 100%)",
        "border-line":
          "radial-gradient(16652.99% 50% at 50% 50%, #0EF3A5 0%, rgba(14, 243, 165, 0.00) 100%)",
        "border-purple":
          "linear-gradient(180deg, transparent 0%, #AB27FD 51%, transparent 100%)",
        "border-purple-sm":
          "linear-gradient(90deg, transparent 0%, #AB27FD 51%, transparent 100%)",
      },
      boxShadow: {
        white: "0px 0px 30px -12px rgba(255,255,255,0.3)",
        custom: "0px 28px 44px 0px rgba(14, 243, 165, 0.30)",
        greenInset:
          "0px 1px 8px 0px rgba(52, 232, 170, 0.30) inset",
        iconWhite:
          "0px 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(255, 255, 255, 0.10), 0px 0.5px 0px 0px #FFF inset",
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': {
            backgroundPosition: '50% 50%',
          },
          '50%': {
            backgroundPosition: '100% 0%',
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        gradientMove: 'gradientMove 5s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      blur: {
        'xxl': '200px',
      },
      transitionDuration: {
        600: '600ms',
        750: '750ms',
        // you can add more custom durations here
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn": {
          display: "flex",
          padding: "0 35px",
          justifyContent: "center",
          alignItems: "center",
          height: "59px",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "120%",
          borderRadius: "47px",
          backdropFilter: "blur(14px)",
          transition: "background-color 0.3s ease, color 0.3s ease",
          "&:hover": {
            backgroundColor: "#FDFEFE",
            color: "#0B5B40",
          },

          "@media (max-width: 1024px)": {
            height: "50px",
          },
          "@media (max-width: 768px)": {
            height: "40px",
          },
        },
        ".heading-2": {
          color: "#FDFEFE",
          fontSize: "60px",
          fontWeight: 500,
          lineHeight: "120%",
          "@media (max-width: 1280px)": {
            fontSize: "50px",
          },
          "@media (max-width: 1024px)": {
            fontSize: "40px",
          },
        },
        ".para-1": {
          color: "#FDFEFE",
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "140%",
          "@media (max-width: 1280px)": {
            fontSize: "18px",
          },
          "@media (max-width: 1024px)": {
            fontSize: "16px",
          },
        },
      });
    },
  ],
};
