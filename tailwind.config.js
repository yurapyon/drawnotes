/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      mono: ["Courier", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        "dn-gray": {
          light: "#707070",
          DEFAULT: "#505050",
          dark: "#303030",
          darker: "#141414",
        },
        mode: {
          insert: "#007020",
          normal: "#6060a0",
        },
      },
    },
  },
  plugins: [],
};
