module.exports = {
  purge: {
    enabled: false,
    content: []
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#3655C7',
        ['primary-lighter']: '#5f78d3'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: [],
}
