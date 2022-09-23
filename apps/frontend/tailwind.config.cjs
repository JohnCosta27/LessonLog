module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#4c9305',

          secondary: '#35a3bf',

          accent: '#28deff',

          neutral: '#272130',

          'base-100': '#49424C',

          info: '#6584EC',

          success: '#48D5A2',

          warning: '#EF8E06',

          error: '#ED7B64',
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
