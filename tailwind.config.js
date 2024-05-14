/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9614e1",
        grey: "rgb(189,186,186)",
        dark: "#1a1a1a",
        offWhite: "#efe9ff"
      },
      fontFamily: {
        cxbold: ["Chillax-Bold", "sans-serif"],
        cxsemibold: ["Chillax-SemiBold", "sans-serif"],
        cxmedium: ["Chillax-Medium", "sans-serif"],
        cxregular: ["Chillax-Regular", "sans-serif"],
        cxlight: ["Chillax-Light", "sans-serif"],
        smedium: ["Satoshi-Medium", "sans-serif"],
        sregular: ["Satoshi-Regular", "sans-serif"]
      }
    }
  },
  plugins: []
};
