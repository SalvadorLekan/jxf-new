module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridRow: {
        "span-10": "span 10 / span 10",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      height: ["focus-within"],
    },
  },
  plugins: [],
};
