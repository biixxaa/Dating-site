/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0ff',
          300: '#f0a8ff',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#711c75',
        },
      },
      backdropBlur: {
        xl: '1.5rem',
      },
      backgroundImage: {
        gradient: 'radial-gradient(circle at top left, rgba(217,70,239,0.25), transparent 35%), linear-gradient(135deg, #020617, #111827 50%, #0f172a)',
      },
    },
  },
  plugins: [],
}
