/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1A1814',
        'bg-card': '#221F1A',
        'bg-elevated': '#2A2620',
        amber: {
          DEFAULT: '#C4832A',
          hover: '#D4922E',
          light: '#E8C87A',
        },
        gold: '#E8C87A',
        cream: '#F2EDE4',
        blue: {
          electric: '#4A9EFF',
        },
        surface: '#2F2A24',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'amber': '0 0 20px rgba(196, 131, 42, 0.3)',
        'amber-lg': '0 0 40px rgba(196, 131, 42, 0.4)',
      }
    },
  },
  plugins: [],
}
