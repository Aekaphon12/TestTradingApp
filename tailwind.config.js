/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { bg:"#0A0F12", card:"#0F151A", line:"#23323C", jade:"#2DC29D" } } },
  plugins: [],
};
