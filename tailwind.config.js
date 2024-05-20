/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:'class',
  theme: {
    screens:{
      sm:'576px',
      md:'768px',
      lg:'992px',
      xl:'1200px',
      '2xl':'1400px',
      '3xl':'1600px'
    },
    extend: {
      colors:{
        main:{
          lighter:'#aadaff',
          light:'#48afff',
          dark:'#145180',
          darker:'#172554'
        }
      }
    },
  },
  plugins: [],
};
