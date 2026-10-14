/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbe6',
          100: '#fff3b3',
          200: '#ffe880',
          300: '#ffdc4d',
          400: '#ffd01a',
          500: '#f5b800',
          600: '#d99b00',
          700: '#ad7600',
          800: '#805200',
          900: '#543300',
        },
        dark: {
          900: '#0a0d14',
          800: '#121722',
          700: '#1c2333',
          600: '#2a3449',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        '3d-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0,0,0,0.4)',
        '3d-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(245, 184, 0, 0.25)',
        'glow-gold': '0 0 25px rgba(245, 184, 0, 0.4)',
      },
      backgroundImage: {
        'dark-vignette': 'radial-gradient(circle at center, transparent 0%, rgba(10, 13, 20, 0.85) 100%)',
        'hero-gradient': 'linear-gradient(to right, rgba(10, 13, 20, 0.95) 0%, rgba(10, 13, 20, 0.7) 40%, rgba(10, 13, 20, 0.4) 70%, rgba(10, 13, 20, 0.9) 100%)',
      }
    },
  },
  plugins: [],
}
