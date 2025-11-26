/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'literary-black': '#0A0908',
        parchment: '#F7F3E9',
        graphite: '#2C2B28',
        'ink-blue': '#1E3A5F',
        'margin-red': '#8B2635',
        'gold-leaf': '#C9A961',
        sage: '#6B7F59',
        'stone-gray': '#B8B5AD',
        'soft-gray': '#E8E6DC',
        whisper: '#FAF9F5',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Crimson Pro', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        reading: '75ch',
      },
    },
  },
  plugins: [],
};
