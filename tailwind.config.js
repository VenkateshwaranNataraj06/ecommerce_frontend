/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {

      screens: {
        'max-400': {'max': '400px'},
      },
    },
  },
  plugins: [],
}