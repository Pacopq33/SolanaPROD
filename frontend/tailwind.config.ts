import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#05060d',
        neon: {
          cyan: '#00f5ff',
          magenta: '#ff00f5',
          amber: '#f5a623'
        }
      },
      fontFamily: {
        display: ['Orbitron', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'grid-neon': 'radial-gradient(circle at center, rgba(0,245,255,0.15), transparent 55%)'
      }
    }
  },
  plugins: []
};

export default config;
