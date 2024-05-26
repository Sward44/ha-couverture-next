const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", ...defaultTheme.fontFamily.sans],
        serif: ["Chonburi", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        supernova: {
          50: "#fffee7",
          100: "#fffec1",
          200: "#fff886",
          300: "#ffec41",
          400: "#ffdb0d",
          500: "#ffcc00",
          600: "#d19500",
          700: "#a66a02",
          800: "#89530a",
          900: "#74430f",
          950: "#442304",
        },
        mineShaft: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#333333",
          950: "#262626",
        },
        mahogany: {
          50: "#fff2f1",
          100: "#ffe2e0",
          200: "#ffcac6",
          300: "#ffa69f",
          400: "#ff7368",
          500: "#fb4638",
          600: "#e92819",
          700: "#c41e11",
          800: "#a21d12",
          900: "#861e16",
          950: "#4a0b06",
        },
      },
      boxShadow: {
        ha: " 0px 2px 10px 1px rgba(0, 0, 0, 0.15)",
        haDark: "0px 2px 10px 1px rgba(255, 255, 255, 0.15)",
      },
      dropShadow: {
        ha: [
          "0px 2px 10px rgb(255, 255, 255 / 0.15)",
          "0px 1px 8px rgb(255, 255, 255 / 0.1)",
        ],
      },
      scale: {
        101: "1.01",
        102: "1.02",
      },
      stroke: {
        1.1: "1.1",
        1.2: "1.2",
        1.3: "1.3",
        1.4: "1.4",
        1.5: "1.5",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        110: "110",
        120: "120",
        130: "130",
        140: "140",
        150: "150",
        160: "160",
        170: "170",
        180: "180",
        190: "190",
        200: "200",
      },
      transitionDelay: {
        3000: "3000ms",
        10000: "10000ms",
      },
      keyframes: {
        apparitionEcran: {
          from: { backgroundColor: "rgba(10, 10, 10, 0)" },
          to: { backgroundColor: "rgba(10, 10, 10, 0.6)" },
        },
        apparitionCard: {
          from: { scale: "0.2" },
          to:   { scale: "1" },
        },
        apparitionBanner: {
          "0%"  : { transform: "translateY(110%)" },
          "35%" : { transform: "translateY(-8%)" },
          "60%" : { transform: "translateY(4%)" },
          "100%": { transform: "translateY(0)" },
        },
        apparitionBannerMd: {
          "0%"  : {transform: "translateX(-110%)"},
          "35%" : {transform: "translateX(8%)"},
          "60%" : {transform: "translateX(-4%)"},
          "100%": {transform: "translateX(0)"}
        },
      },
      animation: {
        apparitionBanner: "apparitionBanner 0.6s ease",
        apparitionBannerMd: "apparitionBannerMd 0.6s ease",
        apparitionCard: "apparitionCard 0.6s ease",
      },    
    },
    plugins: [],
  },
};
