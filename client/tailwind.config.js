/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Poppins', 'sans-serif;'
      ]
      },
      width: {
        main: '1210px',
      },
      backgroundColor: {
        main: '#ee3131'
      },
      color: {
        main: '#ee3131'
      },
      textColor: {
        main: '#ee3131',
        main1: '#d70018'
      },
      borderColor:{
        main: '#ee3131'
      }
      

    },
  },
  plugins: [],
}