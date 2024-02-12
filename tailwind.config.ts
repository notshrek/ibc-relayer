import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clashDisplay: ["var(--font-clash-display)"],
      },
      animation: {
        slideY: "slideY 0.5s ease-in forwards",
      },
      keyframes: {
        slideY: {
          "100%": {
            transform: "translateY(var(--target-y))",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
