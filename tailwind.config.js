/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        alternatif: "var(--alternatif)",
      },
      backgroundColor: {
        gradient:
          "background: linear-gradient(90deg, rgba(65,197,184,1) 0%, rgba(240,204,4,1) 50%, rgba(231,92,49,1) 100%)",
      },
    },
  },
  plugins: [],
};
