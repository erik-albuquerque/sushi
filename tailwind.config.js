/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        red: {
          400: '#DD2E44'
        },
        gray: {
          50: '#F2F3F5',
          100: '#E8EAED',
          400: '#7C7C8A',
          600: '#4F5660',
          700: '#333333'
        }
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(500)/
    }
  ]
}
