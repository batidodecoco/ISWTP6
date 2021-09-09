module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-violet': '#6F2DBD',
        'brand-amethyst': '#A663CC',
        'brand-wisteria': '#B298DC',
        'brand-beau-blue': '#B8D0EB',
        'brand-celeste': '#B9FAF8'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
