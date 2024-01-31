/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-light': 'linear-gradient(to right, #021B79, #0466C8)',
        'gradient-dark': ' linear-gradient(to right, #000000, #434343)',
      },
      backgroundColor: {
        'dark': 'rgba(0,0,0,0.1)',
        'dark-lighter': 'rgba(0,0,0,0.08)',
        'light': 'rgba(255,255,255,0.1)',
        'lighter': 'rgba(255,255,255,0.05)',
      },

    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.hide-scrollbar': {
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
}

