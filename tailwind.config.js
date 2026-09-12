/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#070B10',
          panel: '#0E141B',
          raised: '#131B24',
          border: '#1E2A33',
        },
        ink: {
          DEFAULT: '#E8EDF2',
          muted: '#8B98A5',
          faint: '#5B6672',
        },
        accent: {
          DEFAULT: '#35C7C1',
          dim: '#1E8F8A',
          bright: '#5FE1DB',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(53, 199, 193, 0.35)',
      },
    },
  },
  plugins: [],
}
