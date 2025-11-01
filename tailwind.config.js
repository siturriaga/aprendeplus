import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'Inter', 'sans-serif']
      },
      colors: {
        royal: '#5A4BFF',
        gold: '#F8C53A'
      },
      boxShadow: {
        glass: '0 30px 60px -20px rgba(90,75,255,0.45)'
      }
    }
  },
  plugins: []
} satisfies Config;
