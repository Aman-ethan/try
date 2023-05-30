/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "auth-blue": {
          light: "#7bd3ef",
          DEFAULT: "#0fabe0",
          dark: "#0f80b0",
        },
      },
      boxShadow: {
        "auth-input": "0.125rem 0.125rem 0.375rem rgba(159, 153, 153, 0.25)",
        "auth-button": "0.125rem 0.125rem 0.5rem rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    function initial({ addVariant }) {
      addVariant("initial", "html :where(&)");
    },
  ],
};
