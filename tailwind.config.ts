import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/renderer/**/*.{html,js,ts,jsx,tsx}', './src/renderer/css/global.css'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
