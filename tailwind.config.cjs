const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
      "wash-darker": "var(--wash-darker)",
    },
    extend: {
      fontFamily: {
        sans: ["Verdana", "ui-sans-serif", "system-ui"],
        serif: ["Georgia", "ui-sans-serif", "system-ui"],
      },
      textShadow: {
        sm: "0 1px 2px currentColor",
        DEFAULT: "0 2px 4px currentColor",
        lg: "0 8px 16px currentColor",
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
                color: theme("colors.wash-light"),
                backgroundColor: theme("colors.wash-darker"),
                padding: "2px 4px",
                borderRadius: "4px",
                fontWeight: null,
              },
              "code::before": {
                content: null,
              },
              "code::after": {
                content: null,
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
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
