/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        dark: {
          1: '#26284F',
          2: '#4F517A',
          3: '#43414C',
          4: '#263E4F',
        },
        blue: {
          1: '#6F63A1',
        },
        sky: {
          1: '#619BD3',
          2: '#AF9BFE',
          3: '#E3BF49',
        },
        orange: {
          1: '#49E3C3',
        },
        purple: {
          1: '#494EE3',
        },
        yellow: {
          1: '#E36849',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;