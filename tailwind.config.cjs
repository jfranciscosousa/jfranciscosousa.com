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
      primary: "var(--primary)",
      "primary-hover": "var(--primary-hover)",
      "primary-light": "var(--primary-light)",
      accent: "var(--accent)",
      transparent: "transparent",
      current: "currentColor",
      background: "var(--background)",
      foreground: "var(--foreground)",
      "wash-light": "var(--wash-light)",
      "wash-dark": "var(--wash-dark)",
      "wash-darker": "var(--wash-darker)",
      "neutral-50": "var(--neutral-50)",
      "neutral-100": "var(--neutral-100)",
      "neutral-200": "var(--neutral-200)",
      "neutral-400": "var(--neutral-400)",
      "neutral-600": "var(--neutral-600)",
      "neutral-800": "var(--neutral-800)",
      "neutral-900": "var(--neutral-900)",
    },
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
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
