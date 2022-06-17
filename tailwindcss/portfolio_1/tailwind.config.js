/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      nunito: ['Nunito', 'sans-serif'],
    },
    extend: {
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
