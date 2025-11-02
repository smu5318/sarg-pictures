/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "sans-serif"],
      },
      colors: {
        kangawa: {
          light_bg: "#F6F1EB", // reemplaza con paleta real
          light_text: "#2D2A27",
          dark_bg: "#0F1115",
          accent: "#B55C66",
          // agrega más tokens según la imagen
        },
      },
    },
  },
  plugins: [],
};
