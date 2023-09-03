import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1F1F1F",
        ruby: "#870000",
        babyblue: "#00AFF0"
      },
      scale: {
        '102': '1.025',
        '97': '0.975'
      }
    },
  },
  plugins: [],
} satisfies Config;
