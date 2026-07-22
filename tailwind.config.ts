import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#050514",
        panel: "rgba(255,255,255,0.05)",
        cyan: {
          glow: "#22d3ee",
        },
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(34,211,238,0.4), 0 0 20px rgba(34,211,238,0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
