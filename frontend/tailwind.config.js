/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ul: {
          listStyle: "initial",
          paddingLeft: "2rem",
        },
        ol: {
          listStyle: "initial",
          paddingLeft: "2rem",
        },
      });
    },
  ],
};
