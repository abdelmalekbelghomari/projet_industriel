/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: "#D62D2A",
        customBlue: "#1E1E4C",
      },
    },
  },
  plugins: [],
}