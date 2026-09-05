/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', "sans-serif"],
        // Used by the voucher preview (Row) so PDF/DOCX exports keep their look
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        stroke: "#E2E8F0",
        black: {
          ...colors.black,
          DEFAULT: "#1C2434",
          2: "#010101",
        },
        gray: {
          ...colors.gray,
          DEFAULT: "#EFF4FB",
          2: "#F7F9FC",
          3: "#FAFAFA",
        },
        accent: {
          DEFAULT: "#0F766E",
          hover: "#0C5D57",
          soft: "#E3F4F1",
        },
        ink: {
          DEFAULT: "#0F1B2D",
          soft: "#475569",
          faint: "#94A3B8",
        },
      },
    },
  },
  plugins: [],
};
