import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        raspberry: { DEFAULT: "#A71950", dark: "#8C1443", light: "#C7457A" },
        burgundy: { DEFAULT: "#701637", deep: "#4A0E25" },
        cream: { DEFAULT: "#F8F5F0", dark: "#EFE9E0" },
        gold: { DEFAULT: "#C39A60", light: "#E3CDA8" },
        blush: { DEFAULT: "#F1DDE5", light: "#F8ECF1" },
        ink: { DEFAULT: "#2A1A20", soft: "#5E4A52", muted: "#8A7880" },
      },
      fontFamily: {
        display: ['"Unbounded Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
      maxWidth: { site: "76rem" },
    },
  },
  plugins: [],
};
export default config;
