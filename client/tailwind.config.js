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
        width: "3px",
      },
      ".new-scrollbar::-webkit-scrollbar-track": {
        backgroundColor: "transparent", 
      },
      ".new-scrollbar::-webkit-scrollbar-thumb": {
        background: "transparent",
      },
      ".new-scrollbar": {
        "scrollbar-width": "thin",
        "scrollbar-color": "#E5E4E2 transparent",
      },
    };
    addUtilities(newUtilities)
  }],
}

