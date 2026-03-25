/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          blue:   "#0F90FF",
          cyan:   "#00DCE6",
          green:  "#1EDD80",
          amber:  "#FFA600",
          purple: "#9B6DFF",
        },
        dark: {
          0: "#090A0F",
          1: "#0E1018",
          2: "#151821",
          3: "#1C2029",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float":   "float 5s ease-in-out infinite",
        "marquee": "marquee 22s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease both",
        "count-up": "countUp 0.6s ease both",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: 1 },
          "50%":     { opacity: 0.4 },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(14px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        countUp: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
