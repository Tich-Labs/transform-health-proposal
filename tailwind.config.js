/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A7B72',
          light: '#D0EDEB',
          dark: '#0F5550',
        },
        rose: { DEFAULT: '#C8506A', light: '#F5D6DC', dark: '#8B2A40' },
        teal: { DEFAULT: '#1A7B72', light: '#D0EDEB', dark: '#0F5550' },
        ink: '#1C1C1E',
        cream: '#FAF8F4',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
