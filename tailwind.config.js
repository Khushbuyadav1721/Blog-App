import flowbitePlugin from 'flowbite/plugin';
import scrollbar from 'tailwind-scrollbar';
import lineClamp from '@tailwindcss/line-clamp'; 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
    scrollbar,
    lineClamp, 
  ],
};
