/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["GT America Mono", "monospace"],
      },
      animation: {
        "slide-in": "slide-in 1s ease-out forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      width: {
        profile_card: "300px",
      },
      height: {
        120: "120px",
      },
      border: {
        "b-1": "1px solid #EFF4FB",
      },
      bottom: {
        "1px": "1px",
      },
      colors: {
        primary: "#0058DD",
        secondary: "#F1F9DC",
        current: "currentColor",
        transparent: "transparent",
        custom_green: "#0D3A25",
        about_us: "#e0ecfb",
        white: "#FFFFFF",
        black: {
          ...colors.black,
          DEFAULT: "#1C2434",
          2: "#010101",
        },
        hoverBg: "#0D3A25",
        red: {
          ...colors.red,
          DEFAULT: "#FB5454",
        },
        buttonGreen: "#325009",
        body: "#64748B",
        bodydark: "#AEB7C0",
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        primary: "#3C50E0",
        stroke: "#E2E8F0",
        pink: "#FF0D90",
        gray: {
          ...colors.gray,
          DEFAULT: "#EFF4FB",
          2: "#F7F9FC",
          3: "#FAFAFA",
        },
        graydark: "#333A48",
        whiten: "#F1F5F9",
        whiter: "#F5F7FD",
        boxdark: "#24303F",
        "boxdark-2": "#1A222C",
        strokedark: "#2E3A47",
        "form-strokedark": "#3d4d60",
        "form-input": "#1d2a39",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
      },
      fontSize: {
        "title-max": ["76px", "85px"],
        "title-xxl": ["44px", "55px"],
        "title-xl": ["36px", "45px"],
        "title-xl2": ["33px", "45px"],
        "title-lg": ["28px", "35px"],
        "title-md": ["24px", "30px"],
        "title-md2": ["26px", "30px"],
        "title-sm": ["20px", "26px"],
        "title-xsm": ["18px", "24px"],
      },

      boxShadow: {
        default: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
        card: "0px 1px 3px rgba(0, 0, 0, 0.12)",
        "card-2": "0px 1px 2px rgba(0, 0, 0, 0.05)",
        switcher:
          "0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)",
        "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
        1: "0px 1px 3px rgba(0, 0, 0, 0.08)",
        2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
        3: "0px 1px 5px rgba(0, 0, 0, 0.14)",
        4: "0px 4px 10px rgba(0, 0, 0, 0.12)",
        5: "0px 1px 1px rgba(0, 0, 0, 0.15)",
        6: "0px 3px 15px rgba(0, 0, 0, 0.1)",
        7: "-5px 0 0 #313D4A, 5px 0 0 #313D4A",
        8: "1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)",
      },
      dropShadow: {
        1: "0px 1px 0px #E2E8F0",
        2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
