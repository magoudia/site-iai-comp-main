/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'iai-blue': '#22507A', // bleu du logo
        'iai-red': '#8B2C2B', // rouge du logo
      },
    },
  },
  plugins: [],
};
