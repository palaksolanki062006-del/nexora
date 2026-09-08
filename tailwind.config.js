/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff4ff',
          100: '#dbe1ff',
          500: '#2563eb',
          600: '#004ac6',
          700: '#003ea8',
          900: '#0b1c30'
        },
        surface: {
          bg: '#f8f9ff',
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
