/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Wotfard", "Inter var", "sans-serif"]
    },
    extend: {
      colors: {
        'blue': '#1fb6ff'
      },
      filter: {
        "save-effect": 'brightness(0) saturate(100%) invert(39%) sepia(69%) saturate(5923%) hue-rotate(137deg) brightness(106%) contrast(87%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
