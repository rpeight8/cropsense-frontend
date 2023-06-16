/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#2A4B7C",
        ternary: "#403D59",
        destructive: "#C72C41",
        accent: "#FF6F40",
        "accent-2": "#46B2C8",
        "accent-3": "#F6D32B",
      },
    },
  },
  plugins: [],
};
