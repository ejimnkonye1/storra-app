module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
  extend: {
  fontFamily: {
    grotesk: ["SpaceGrotesk_400Regular"],
    groteskMedium: ["SpaceGrotesk_500Medium"],
    groteskBold: ["SpaceGrotesk_700Bold"],
  },
},
  },
  plugins: [],
}