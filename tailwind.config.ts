import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-gray": "#E7F1FF",
        "primary-blue": "#4D81BC"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-grad": "linear-gradient(169.64deg, #151D29 41.39%, #406A99 77.22%, #2C5D93 100%)"
      },
      height: {
        "full-with-nav": "calc(100vh - 60px)"
      }
    },
  },
  plugins: [],
};
export default config;
