/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Xưởng Coffee Color Palette
        primary: {
          50: '#F5F5DC', // Be nhạt - background
          100: '#FFF8E1', // Vàng nhạt - accent
          500: '#D4AF37', // Vàng đậm - highlight
          600: '#4B2E2E', // Nâu vừa - secondary
          700: '#3E2723', // Nâu đậm - primary
          800: '#2C1E1A', // Nâu rất đậm
          900: '#1A120F', // Nâu tối
        },
        coffee: {
          50: '#F5F5DC',
          100: '#FFF8E1',
          200: '#F5DEB3',
          300: '#D4AF37',
          400: '#B8860B',
          500: '#4B2E2E',
          600: '#3E2723',
          700: '#2C1E1A',
          800: '#1A120F',
          900: '#0F0A08',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
