import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
    './constants.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'like-heart': 'likeHeart 0.8s ease-in-out forwards',
        'zoom-rotate-in': 'zoomRotateIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-rotate-out': 'zoomRotateOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-in': 'zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-out': 'zoomOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        likeHeart: {
          '0%': { transform: 'scale(0) rotate(-15deg)', opacity: '0' },
          '15%': { transform: 'scale(1.2) rotate(-15deg)', opacity: '1' },
          '30%': { transform: 'scale(0.9) rotate(-15deg)', opacity: '1' },
          '45%': { transform: 'scale(1) rotate(-15deg)', opacity: '1' },
          '80%': { transform: 'scale(1) rotate(-15deg)', opacity: '1' },
          '100%': { transform: 'scale(0.8) translateY(-50px) rotate(-15deg)', opacity: '0' },
        },
        zoomRotateIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(90deg)' },
        },
        zoomRotateOut: {
          '0%': { opacity: '1', transform: 'scale(1) rotate(90deg)' },
          '100%': { opacity: '0', transform: 'scale(0.8) rotate(0deg)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
