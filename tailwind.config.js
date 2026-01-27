/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary-light" : "#3B82F6",
        "secondary-light": "#60A5FA",
        "background-light": "#F0F9FF",
        "primary-text-light": "#1E3A8A",
        "secondary-text-light": "#64748B",
        "accent-light": "#2563EB",
        "card-light": "#EDE8E3",
        "primary-dark" : "#0E7490",
        "secondary-dark": "#164E63",
        "background-dark": "#02001C",
        "card-dark": "#272729",
        "primary-text-dark": "#E0F2FE",
        "secondary-text-dark": "#94A3B8",
        "accent-dark": "#22D3EE"
      }
    },
  },
  plugins: [],
}

