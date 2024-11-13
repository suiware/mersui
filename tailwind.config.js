/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./lib/**/*.{ts,tsx}",
    // @todo Make sure to remove the following line when ready.
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "50%": { "border-color": "#0ea5e9" },
        },
      },
      animation: {
        border: "blink 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
