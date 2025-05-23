/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pale-blue50': '#F7FBFD',
        'pale-blue100': '#D6EBF8',
        'pale-blue200': '#B6DBF2',
        'pale-blue300': '#9EC2D9',
        'pale-blue400': '#88AABF',
        'pale-blue500': '#7392A5',
        'pale-blue600': '#5E7A8C',
        'pale-blue700': '#4B6373',
        'pale-blue800': '#384C59',
        'pale-blue900': '#273640',
        
        'red50': '#FFF4F5',
        'red100': '#FFDDE0',
        'red200': '#FFC6CB',
        'red300': '#FFAFB6',
        'red400': '#FF98A1',
        'red500': '#E1747E',
        'red600': '#BF545D',
        'red700': '#9D3941',
        'red800': '#7B232A',
        'red900': '#591218',
        
        'golden-yellow50': '#FFFAEC',
        'golden-yellow100': '#FFF0C2',
        'golden-yellow200': '#FFE598',
        'golden-yellow300': '#FFDB6E',
        'golden-yellow400': '#F2C641',
        'golden-yellow500': '#D0A82D',
        'golden-yellow600': '#AE8A1D',
        'golden-yellow700': '#8C6D11',
        'golden-yellow800': '#6A5107',
        'golden-yellow900': '#483601',
        
        'green50': '#F6FFF2',
        'green100': '#DBFFCA',
        'green200': '#C0FFA3',
        'green300': '#A2F979',
        'green400': '#89DC62',
        'green500': '#72BF4E',
        'green600': '#5CA23C',
        'green700': '#48852C',
        'green800': '#36681E',
        'green900': '#254A13',
        
        'mono50': '#EEEEEE',
        'mono100': '#F1F1F1',
        'mono200': '#DBDBDB',
        'mono300': '#C4C4C4',
        'mono400': '#ADADAD',
        'mono500': '#969697',
        'mono600': '#7D7E80',
        'mono700': '#656769',
        'mono800': '#4E5053',
        'mono900': '#37393C',
        
        'white': '#FBFBFB',
        'black': '#090909',
      },
    },
  },
  plugins: [],
}

