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
        'blue': '#1fb6ff',
        'border-grey' :  '#DADCE0',
      },
      filter: {
        "save-effect": 'var(--filter-save-effect)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
