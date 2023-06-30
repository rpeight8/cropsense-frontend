/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        popover: "#1F2937",
        "popover-foreground": "#FFFFFF",
        secondary: "#2A4B7C",
        ternary: "#403D59",
        destructive: "#C72C41",
        "accent-foreground": "#FFFFFF",
        muted: "#6B7280",
        accent: "#FF6F40",
        "accent-2": "#46B2C8",
        "accent-3": "#F6D32B",
      },
    },
  },
  plugins: [],
};
