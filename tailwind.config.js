/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#050d1a',
        'royal-blue': '#0a1628',
        'midnight': '#081220',
        'studio-white': '#ffffff',
        'studio-obsidian': '#040914',
        'champagne-gold': '#c9a96e',
        'regal-gold': '#d4b87a',
        'champagne-light': '#d4b87a',
        'studio-green': '#00e676',
        'ivory-white': '#f5f0e8',
        'dark-charcoal': '#09121f',
        'surface': '#0a1628',
        'surface-container': '#081220',
        'glass-fill': 'rgba(10, 22, 40, 0.65)',
        'glass-stroke': 'rgba(201, 169, 110, 0.16)',
      },
      spacing: {
        'margin-desktop': '80px',
        'margin-mobile': '20px',
        'unit-xl': '64px',
        'gutter': '32px',
        'container-max': '1440px',
      },
      fontFamily: {
        display: ['"Canela"', '"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', '"Playfair Display"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['56px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['28px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'label-caps': ['12px', { lineHeight: '1.0', letterSpacing: '0.15em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};
