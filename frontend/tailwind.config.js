/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        card: "#1E1E1E",
        text: "#E0E0E0",
        mutedText: "#A0A0A0",
        accent: {
          DEFAULT: "#FF5500",
          dark: "#CC4400",
        },
        success: "#4CAF50",
        error: "#F44336",
        border: "#2C2C2C",
      },
    },
  },
  plugins: [],
};
