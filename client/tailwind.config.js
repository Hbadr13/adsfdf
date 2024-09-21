/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vz-blue-v0': '#e2f3fe',

        'vz-red-v0': '#fee8e2',

        'vz-green-v0': '#f1f9e7',

        'vz-dark-v0': '#33353c',

        'vz-orange-v0': '#f6633c',

        'vz-gray-v0': '#a9aaad',
      }
    },
  },
  plugins: [],
}