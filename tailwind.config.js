/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      black: "#4b4b4b",
      darkgrey: "#868686",
      grey: "#cccccc",
      lightgrey: "#e5e5e5",
      red: "#d62222",
      blue: "#4b89ab",
      green: "#61eb6e",
    },

    extend: {
      spacing: {
        68: "17rem",
        80: "20rem",
        84: "21rem",
        128: "32rem", // following the standard of 128 / 4 = 32
      },
      screens: {
        sm: "375px",
      },
    },
  },
  plugins: [],
};
