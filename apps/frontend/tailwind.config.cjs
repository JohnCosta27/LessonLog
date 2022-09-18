module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#efd90e",

          secondary: "#ed76e1",

          accent: "#d653a4",

          neutral: "#2C3135",

          "base-100": "#3B3E54",

          info: "#9FD1F4",

          success: "#4FD886",

          warning: "#C58C07",

          error: "#EF1F56",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
