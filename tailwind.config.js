module.exports = {
  content: ['./dist/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily:{
        'lora': ['Lora'],
      }
    },
  },
  plugins: [
    require("tailwindcss"),
  ],
}
