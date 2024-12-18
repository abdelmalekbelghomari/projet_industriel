/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: "#D62D2A",
        customRedDark: "#B32421",
        customBlue: "#1E1E4C",
      },
      fontFamily: {
        costaStd: ['Costa Std', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
