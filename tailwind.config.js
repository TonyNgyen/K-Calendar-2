/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cerulean": "#90C2E7",
        "lightmodeRed": "#d21a28",
        "darkmodeRed": "#ff8fa3",
        "defaultBg": "#EEEEEE",
        "darkmodeBg": "#101014",
        "darkmodeReleaseCard": "#2d2d2d"
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
}