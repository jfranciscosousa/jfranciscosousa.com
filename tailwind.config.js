module.exports = {
  purge: {
    content: [
      "./site/**/*.md",
      "./site/**/*.liquid",
      "./site/**/*.njk",
      "./site/**/*.js",
      "./assets/**/*.ts",
      "./assets/**/*.js",
      "./assets/**/*.css",
    ],
  },
  darkMode: "class",
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    extend: {
      fontFamily: {
        sans: ["Verdana", "ui-sans-serif", "system-ui"],
        serif: ["Georgia", "ui-sans-serif", "system-ui"],
      },
      colors: {
        vBlue: "#0a79c4",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: "100%",
              a: {
                color: theme("colors.vBlue"),
              },
            },
          ],
        },
        light: {
          css: [
            {
              color: theme("colors.gray.300"),
              '[class~="lead"]': {
                color: theme("colors.gray.300"),
              },
              a: {
                color: theme("colors.vBlue"),
              },
              strong: {
                color: theme("colors.gray.200"),
              },
              "ol > li::before": {
                color: theme("colors.gray.400"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.600"),
              },
              hr: {
                borderColor: theme("colors.gray.700"),
              },
              blockquote: {
                color: theme("colors.gray.200"),
                borderLeftColor: theme("colors.gray.700"),
              },
              h1: {
                color: theme("colors.gray.200"),
              },
              h2: {
                color: theme("colors.gray.200"),
              },
              h3: {
                color: theme("colors.gray.200"),
              },
              h4: {
                color: theme("colors.gray.200"),
              },
              "figure figcaption": {
                color: theme("colors.gray.400"),
              },
              code: {
                color: theme("colors.gray.200"),
              },
              "a code": {
                color: theme("colors.gray.200"),
              },
              pre: {
                color: theme("colors.gray.700"),
              },
              thead: {
                color: theme("colors.gray.200"),
                borderBottomColor: theme("colors.gray.600"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {},
    typography: ["responsive", "dark"],
  },
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: ["light", "sm", "md", "lg"],
    }),
  ],
};
