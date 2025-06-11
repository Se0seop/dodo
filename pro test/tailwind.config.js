/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'vazir': ['Vazir', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#2D2D2D',
          200: '#252525',
          300: '#1A1A1A',
          400: '#151515',
          500: '#101010',
        },
        neon: {
          green: '#00FF00',
          pink: '#FF007F',
          blue: '#00D1FF',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { 
            boxShadow: '0 0 5px theme(colors.neon.green), 0 0 10px theme(colors.neon.green), 0 0 15px theme(colors.neon.green)',
          },
          '100%': { 
            boxShadow: '0 0 10px theme(colors.neon.green), 0 0 20px theme(colors.neon.green), 0 0 30px theme(colors.neon.green)',
          },
        },
        'glow': {
          '0%': { 
            textShadow: '0 0 5px theme(colors.neon.blue), 0 0 10px theme(colors.neon.blue)',
          },
          '100%': { 
            textShadow: '0 0 10px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue), 0 0 30px theme(colors.neon.blue)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};