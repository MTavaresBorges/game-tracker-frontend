/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{vue,js,ts}",   
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0c335c',
        'secondary':'#134a85',
      },
    },
  },
  fontFamily: {
    Roboto: ['Roboto', 'sans-serif'],
  },
  plugins: [],
};

