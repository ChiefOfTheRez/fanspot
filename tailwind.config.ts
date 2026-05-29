import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        fan: {
          black: "#050816",
          card: "#0B1020",
          card2: "#10172A",
          border: "#1E2A44",
          blue: "#1E6BFF",
          sky: "#5AA9FF",
          muted: "#9AA7BD"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(30, 107, 255, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
