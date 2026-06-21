/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        butter:     '#FFEFB3',
        forest:     '#013E37',
        tangerine:  '#F58F20',
        leaf:       '#467434',
        seagrey:    '#363636',
        'bg-main':  '#FFFDF0',
        'bg-card':  '#FFF8D6',
        'bg-dark':  '#012B25',
        'text-body':'#2A2A2A',
        'text-muted':'#5C5C3D',
        highlight:  '#FFD966',
        border:     '#D4C97A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script:  ['"Dancing Script"', 'cursive'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        clay: '24px',
        pill: '9999px',
      },
      animation: {
        'blob-float': 'blob-float 6s ease-in-out infinite',
        'marquee':    'marquee 20s linear infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' }
        },
      }
    }
  },
  plugins: []
}
