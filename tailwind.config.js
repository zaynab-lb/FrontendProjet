/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          900: '#3E2723',
          700: '#6F4E37',
          600: '#8D6E63',
          500: '#A1887F',
        },
        beige: '#F5EFE6',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // pour line-clamp-3
  ],
};
