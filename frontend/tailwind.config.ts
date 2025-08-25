import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        bebas: ["var(--font-bebas)", "cursive"],
      },
    },
  },
};

export default config;
