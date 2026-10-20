/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0B',
        'bg-elevated': '#141414',
        'border-gold': '#C9A646',
        'gold-light': '#F5E3A1',
        gold: '#D4AF37',
        'gold-dark': '#9C7A1E',
        text: '#F2EAD3',
        muted: '#A89F86',
        card: '#141414',
        border: 'rgba(201, 166, 70, 0.3)',
        primary: {
          DEFAULT: '#D4AF37',
          foreground: '#0B0B0B',
        },
        'muted-foreground': '#A89F86',
        'sidebar-border': 'rgba(201, 166, 70, 0.25)',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E3A1, #D4AF37, #9C7A1E)',
        'gold-gradient-h': 'linear-gradient(90deg, #F5E3A1, #D4AF37, #9C7A1E)',
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
