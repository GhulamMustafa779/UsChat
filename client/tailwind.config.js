/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [function ({addUtilities}){
    const newUtilities = {
      ".new-scrollbar::-webkit-scrollbar": {
        width: "3px", // Make the scrollbar thinner
      },
      ".new-scrollbar::-webkit-scrollbar-track": {
        backgroundColor: "transparent", // No color for the track
      },
      ".new-scrollbar::-webkit-scrollbar-thumb": {
        background: "#128C7E", // Thumb color
      },
      ".new-scrollbar": {
        "scrollbar-width": "thin",
        "scrollbar-color": "#128C7E transparent",
      },
    };
    addUtilities(newUtilities)
  }],
}

