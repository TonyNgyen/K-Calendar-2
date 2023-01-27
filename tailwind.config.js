/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cerulean": "#90C2E7",
        "lightmodeRed": "#d21a28",
        "darkmodeRed": "#ff8fa3",
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
}