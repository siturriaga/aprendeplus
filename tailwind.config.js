/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-950': '#040558',
        'amber-100': '#fff8e1',
        'amber-200': '#ffe0b2',
        'amber-300': '#ffb300',
        'amber-400': '#ff9800',
        'amber-500': '#ff6f00',
        'blue-700': '#1976d2',
        'blue-800': '#1565c0',
        'blue-900': '#0d47a1',
      },
    },
  },
  plugins: [],
}
