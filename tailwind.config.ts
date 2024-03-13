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
        "primary-blue": "#4D81BC",
        "gray-2": "#5D5D5D",
        "black-2": "#191919",
        "gray-3": "#555555",
        "gray-4": "#ECECEC",
        "blue-1": "#489FDF",
        "black-3": "#161616",
        "gray-5": "#B3B3B3",
        "gray-6": "#676767",
        "gray-7": "#949494",
        "gray-8": "#4F4F4F",
        "blue-2": "#448BC5",
        "gray-9": "#606060",
        "blue-3": "#151d29",
        "blue-4": "#006CBC",
        "gray-10": "#858585",
        "gray-11": "#7B7B7B",
        "gray-12": "#B4B4B4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-grad": 
          "linear-gradient(169.64deg, #151D29 41.39%, #406A99 77.22%, #2C5D93 100%)",
        "white-grad": 
          "linear-gradient(144.41deg, #FFFFFF 0%, rgba(187, 194, 212, 0.788) 77.76%, rgba(96, 112, 153, 0.5) 100.08%, rgba(0, 26, 92, 0.2) 98.51%)",
        "white-grad-2":
          "linear-gradient(143.41deg, #FFFFFF 2.06%, rgba(255, 255, 255, 0.7) 52.2%, rgba(255, 255, 255, 0.3) 98.48%)",
        "white-grad-3":
          "linear-gradient(143.41deg, #FFFFFF 2.06%, rgba(255, 255, 255, 0.7) 52.2%, rgba(255, 255, 255, 0.3) 98.48%)"
      },
      height: {
        "full-with-nav": "calc(100vh - 60px)"
      }
    },
  },
  plugins: [],
};
export default config;
