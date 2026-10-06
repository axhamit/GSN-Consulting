/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { ink: "#0B2239", navy: "#0F2A43", teal: "#0E9F8E", amber: "#F2B134", mist: "#F3F6F9", line: "#D9E1E8" },
      fontFamily: { display: ["var(--font-display)", "sans-serif"], body: ["var(--font-body)", "sans-serif"] },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        blob: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(30px,-20px) scale(1.15)" } },
        pop: { from: { opacity: 0, transform: "scale(.9)" }, to: { opacity: 1, transform: "scale(1)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        blob: "blob 12s ease-in-out infinite",
        pop: "pop .5s ease-out both",
      },
    },
  },
  plugins: [],
};
