/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playwriteDEGrund: ['Playwrite DE Grund', 'sans-serif'],
        playwriteESDeco: ['Playwrite ES Deco', 'sans-serif'],
        margarine: ['Margarine', 'cursive'],
      },
        fontSize: {
        '5px': '5px', 
      },
      container: {
        padding: {
          md: "10rem",
        },
      },
    },
  },
  plugins: [],
};
