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
    screens: {
      sm: "375px",
      lg: "1366px",
    },
    extend: {
      spacing: {
        80: "20rem",
        128: "32rem", // following the standard of 128 / 4 = 32
      },
    },
  },
  plugins: [],
};
