/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#582040',
        secondary: '#271b2c',
        white: 'white',
      },
      fontFamily: {
        'custom': ['Rubik Vinyl']
      }
    }
  },
  plugins: [],
}

