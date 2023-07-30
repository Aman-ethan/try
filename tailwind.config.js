import { theme as AntdTheme } from "antd";
import theme, { primaryColorName, primaryColor } from "./src/config/theme";

const globalToken = AntdTheme.getDesignToken(theme);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {},
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        DEFAULT:
          "0px 2px 16px 0px rgba(71, 86, 107, 0.05), 0px 2px 5px 0px rgba(71, 86, 107, 0.05);",
      },
      colors: {
        primary: Object.entries(globalToken)
          .filter(([key]) => key.startsWith(`${primaryColorName}-`))
          .reduce(
            (acc, [key, value]) => {
              const shade = key.split("-")[1];
              return {
                ...acc,
                [shade]: value,
              };
            },
            { DEFAULT: primaryColor }
          ),
        neutral: {
          DEFAULT: "#bfbfbf",
          1: "#ffffff",
          2: "#fafafa",
          3: "#F1F2F5",
          4: "#f0f0f0",
          5: "#DAD8D8",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#888484",
          10: "#686464",
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        },
        summary: {
          loss: "#CF1322",
          profit: "#389E0D",
        },
        progress: {
          success: "#D9F7BE",
          failure: "#FFCCC7",
        },
      },
      screens: {
        mob: "375px", // Mobile devices
        tab: "640px", // Tablet devices
        lap: "1024px", // Laptop devices
        desk: "1440px", // Desktop devices
      },
    },
  },
  plugins: [
    function initial({ addVariant }) {
      addVariant("initial", "html :where(&)");
    },
  ],
};
