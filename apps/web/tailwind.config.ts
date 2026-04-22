/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // <--- Add this line!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}