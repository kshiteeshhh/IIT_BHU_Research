/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit"],
        roboto: ["Roboto"],
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};
