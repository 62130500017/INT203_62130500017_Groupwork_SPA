module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        salmon:'#ff8c69'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
