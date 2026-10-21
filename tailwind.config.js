/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',               // Obsidian Black
        'bg-elevated': '#171717',    // Graphite Black
        card: '#171717',             // Graphite Black
        gold: '#D4AF62',             // Champagne Gold (Primary Brand Color)
        'gold-champagne': '#D4AF62', // Champagne Gold
        'gold-radiant': '#F8DF87',   // Radiant Gold
        'gold-light': '#FFF0B8',     // Pale Gold
        'gold-pale': '#FFF0B8',      // Pale Gold
        'gold-antique': '#B08D57',   // Antique Gold
        'border-gold': '#B08D57',    // Antique Gold
        'gold-dark': '#8C6429',
        text: '#F7F4EA',
        muted: '#A39B8B',
        border: 'rgba(176, 141, 87, 0.35)',
        primary: {
          DEFAULT: '#D4AF62',
          foreground: '#050505',
        },
        'muted-foreground': '#A39B8B',
        'sidebar-border': 'rgba(176, 141, 87, 0.25)',
      },
      fontFamily: {
        serif: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #8C6429 0%, #D4AF62 22%, #FFF0B8 42%, #F8DF87 58%, #B88632 78%, #F8DF87 100%)',
        'gold-gradient-135': 'linear-gradient(135deg, #8C6429 0%, #D4AF62 22%, #FFF0B8 42%, #F8DF87 58%, #B88632 78%, #F8DF87 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.35)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212,175,55,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(212,175,55,0.5)' },
        },
      },
    },
  },
  plugins: [],
};
