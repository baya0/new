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
        "float":     "float 5s ease-in-out infinite",
        "marquee":   "marquee 22s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        "fade-up":   "fadeUp 0.6s ease both",
        "scale-in":  "scaleIn 0.5s ease both",
        "slide-in":  "slideInRight 0.5s ease both",
        "glow":      "glow 2s ease-in-out infinite",
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
        glow: {
          "0%,100%": { opacity: 0.5 },
          "50%":     { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
