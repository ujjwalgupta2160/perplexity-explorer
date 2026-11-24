/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light & Airy 50-30-20 Palette inspired by the reference photo
        canvas: {
          DEFAULT: '#ffffff', // 50% Crisp White Canvas
          50: '#fafbfb',
          100: '#f6f8f6',
          200: '#eef2ee',
        },
        surface: {
          50: '#ffffff',
          100: '#f8faf8',
          200: '#f1f5f2', // 30% Structural Soft Cards
          300: '#e4eae4',
          border: '#e6ece7',
          subtle: '#f5f8f5',
          dark: '#1b2a21',
        },
        brand: {
          terracotta: '#d96b43', // Floating badge accent like reference photo
          terracottaDark: '#b8542f',
          peach: '#fbf0ea',
          forest: '#1a382b',
          sage: '#2d6a4f',
          mint: '#10b981',
          mintSoft: '#d1fae5',
          cream: '#faf8f5',
          lavender: '#8b5cf6',
          lavenderSoft: '#ede9fe',
          skySoft: '#e0f2fe',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'float': '0 12px 32px -4px rgba(217, 107, 67, 0.18), 0 4px 12px rgba(0,0,0,0.04)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.02), 0 6px 16px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
