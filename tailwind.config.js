/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: '#1A1A1F',
        accent: '#96969f',
      },
    },
  },
  plugins: [],
};
