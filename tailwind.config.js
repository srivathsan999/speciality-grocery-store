/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./auth/**/*.html",
    "./assets/js/**/*.js"
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#14532D',
        'brand-accent': '#84CC16',
        'support-accent': '#F59E0B',
        'text-primary': '#1F2933',
        'text-secondary': '#64748B',
        'bg-primary': '#F9FAFB',
        'bg-surface': '#FFFFFF',
        'border-color': '#E5E7EB',
      },
      fontFamily: {
        'heading': ['DM Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

