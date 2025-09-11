/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        brandGold: "#facc15", // yellow-400
        brandSky: "#38bdf8"   // sky-400
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        fadeIn: "fadeIn .5s ease-out both",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: [],
};
