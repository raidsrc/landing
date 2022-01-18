module.exports = {
  content: [ // where to look for files in your project that contain tailwind class names.
    "./src/**/*.jsx",
    "./src/**/*.html",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'gray-450': 'rgb(140, 150, 160)',
        'gray-449': 'rgb(145, 155, 165)',
        "karkat-blood-red": 'rgb(255,0,0)',
        "brighter-red": 'rgb(255,70,70)',
      },
      opacity: {
        '5': '0.05',
      },
      width: {
        '400px': '400px',
        '900px': '900px',
        '1800px': '1800px',
      },
      height: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '50vh': '50vh',
        '60vh': '60vh',
        '65vh': '65vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      maxWidth: {
        '2xs': '280px',
        'yuge': '1700px',
      },
      minWidth: {
        'spiro-min-width': '700px',
        'icon-min-width': '2rem',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      dropShadow: {
        'raid-icon': '2px 3px 1px rgba(255, 0, 0, 0.3)',
      },
      animation: {
        'slow-spin-spirograph': 'spinCounterclockwise 240s linear infinite',
        'med-spin-spirograph': 'spinCounterclockwise 120s linear infinite',
        'back-arrow-enter': 'backArrowEnter 1s ease-in',
      },
      keyframes: {
        spinCounterclockwise: {
          'from' : {transform: 'rotate(0deg)'},
          'to': {transform: 'rotate(-360deg)'}
        },
        backArrowEnter: {
          'from' : {'opacity': "0"},
          'to': {'opacity': "100"}
        },
      },
    },
    screens: {
      'puny-ass-screen': '360px',
      // => @media (min-width: 640px) { ... }
      "tiny-screen": "440px",
      "sm": "600px",
      "smmd": "660px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },

  },
  plugins: [],
}
