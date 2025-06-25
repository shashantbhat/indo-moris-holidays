import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"League Spartan"', 'sans-serif'],
        subheading: ['"Raleway"', 'sans-serif'],
        body: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
