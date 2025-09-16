/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008350',
        secondary: '#0065B3',
        accent: '#F5F1E9',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}