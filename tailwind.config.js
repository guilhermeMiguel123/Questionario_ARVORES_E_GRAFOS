/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ESSA LINHA É A MUDANÇA MAIS IMPORTANTE!
    // Ela diz ao Tailwind para escanear todos os seus arquivos JavaScript/React na pasta 'src'
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}