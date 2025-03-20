import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7700",//Orange
        "primary-variant": "#FF5003",//Darker Orange
        secondary: "#364BC5",
        "secondary-variant": "#A855F7",
        "background-primary": "#FFF7F0",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
