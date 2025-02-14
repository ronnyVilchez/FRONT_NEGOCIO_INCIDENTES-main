/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9', 
        secondary: '#9333EA', 
        accent: '#4F46E5', 
        background: '#F3F4F6', 
        muted: '#D1D5DB', 
        textPrimary: '#1F2937', 
        textSecondary: '#6B7280', 
        borderColor: '#E5E7EB', 
        buttonPrimary: '#6D28D9', 
        buttonHover: '#5B21B6', 
      },
    },
  },
  plugins: [],
}