/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      mono: ["Courier", ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [],
};
