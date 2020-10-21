/***
 * Styles
 * 
 * Grays:
 * Background, base = #18202f 2nd darkest)
 * Card = #283245
 * Darkest = #090d1c
 * Light = #3a465b
 * Lighter = #EDF2F9
 * Lightest = #eee
 * 
 * Gray:
 * 100: #eee
 * 200: #EDF2F9
 * 300: #677897
 * 400: #E3a465b
 * 600: #283245
 * 700: #18202f
 * 800: #090d1c
 */

 module.exports = {
   theme: {
     fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
     },
     extend: {
       colors: {
        gray: {
          100: '#eee',
          200: '#EDF2F9',
          300: '#677897',
          400: '#3a465b',
          default: '#283245',
          600: '#283245',
          700: '#18202f',
          800: '#090d1c',
        },
       },
       borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
       },
       fontSize: {
       '2xs': '0.6rem'   
       }
     }
   }
 }
