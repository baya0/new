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
          blue:   "#1C4E8A",
          steel:  "#3A7CC0",
          cyan:   "#2A7E9E",
          green:  "#1A7A54",
          amber:  "#B8873E",
          purple: "#5E4A9E",
        },
        dark: {
          0: "#0E1720",
          1: "#131E2C",
          2: "#182638",
          3: "#1B2A3C",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float":     "float 6s ease-in-out infinite",
        "marquee":   "marquee 22s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        "fade-up":   "fadeUp 0.6s ease both",
        "scale-in":  "scaleIn 0.5s ease both",
        "slide-in":  "slideInRight 0.5s ease both",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-6px)" },
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
          from: { opacity: 0, transform: "translateY(20px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: 0, transform: "scale(0.95)" },
          to:   { opacity: 1, transform: "scale(1)" },
        },
        slideInRight: {
          from: { opacity: 0, transform: "translateX(30px)" },
          to:   { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
