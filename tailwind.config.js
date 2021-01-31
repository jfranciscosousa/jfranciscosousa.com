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
    colors: {
      accent: "var(--accent)",
      transparent: "transparent",
      current: "currentColor",
      background: "var(--background)",
      foreground: "var(--foreground)",
      "wash-light": "var(--wash-light)",
      "wash-dark": "var(--wash-dark)",
    },
    extend: {
      fontFamily: {
        sans: ["Verdana", "ui-sans-serif", "system-ui"],
        serif: ["Georgia", "ui-sans-serif", "system-ui"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: "100%",
              color: theme("colors.foreground"),
              a: {
                color: theme("colors.accent"),
              },
              '[class~="lead"]': {
                color: theme("colors.foreground"),
              },
              strong: {
                color: theme("colors.foreground"),
              },
              "ol > li::before": {
                color: theme("colors.wash-light"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.wash-dark"),
              },
              hr: {
                borderColor: theme("colors.wash-dark"),
              },
              blockquote: {
                color: theme("colors.foreground"),
                borderLeftColor: theme("colors.wash-dark"),
              },
              h1: {
                color: theme("colors.foreground"),
              },
              h2: {
                color: theme("colors.foreground"),
              },
              h3: {
                color: theme("colors.foreground"),
              },
              h4: {
                color: theme("colors.foreground"),
              },
              "figure figcaption": {
                color: theme("colors.wash-light"),
              },
              code: {
                color: theme("colors.foreground"),
              },
              "a code": {
                color: theme("colors.foreground"),
              },
              pre: {
                color: theme("colors.foreground"),
              },
              thead: {
                color: theme("colors.foreground"),
                borderBottomColor: theme("colors.wash-dark"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.wash-dark"),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {},
    typography: ["responsive"],
  },
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: ["light", "sm", "md", "lg"],
    }),
  ],
};
