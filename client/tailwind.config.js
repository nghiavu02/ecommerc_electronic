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
      },
      keyframes: {
        'slide-top': {
          '0%': {
           ' -webkit-transform':' translateY(30px);',
                    transform: 'translateY(30px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(10px);',
                    transform: 'translateY(10px);'
          }
        }
      },
      animation: {
        'slide-top':'slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      
      },
      flex:{
        '1': '1 1 0%',
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
        '9': '9 9 0%',

      }
      

    },
  },
  plugins: [],
}