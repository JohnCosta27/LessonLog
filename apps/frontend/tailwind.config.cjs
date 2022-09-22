module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f9c0ec",

          secondary: "#ce1867",

          accent: "#f72738",

          neutral: "#262D31",

          "base-100": "#E2DDEE",

          info: "#7999F1",

          success: "#75E1AB",

          warning: "#E9C63A",

          error: "#EB403D",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
