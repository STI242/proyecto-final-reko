/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.css", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
      colors: {
        primary:{
          back: '#232323',
          lightpink: '#FF1F4D',
          darkpink: '#A0143D',
          purple: '#5D0E41',
          blue: '#00224D' 
        }
        
      },
    },
  },
  plugins: [],
};