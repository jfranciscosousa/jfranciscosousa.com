# jfranciscosousa.com

Personal website built with Astro and Tailwind CSS. Deployed on Vercel.

- Use `mise` to manage development tools.
- Add blog posts in `src/content/blog/`.
- Do not edit generated directories: `.astro/`, `dist/`, or `node_modules/`.
- Keep secrets in `.env`. Never commit them.
- For UI work, follow `.agents/skills/frontend-design/SKILL.md`.
- Preserve the existing visual language. Use semantic, accessible HTML and responsive layouts.

## Runtime and dependency maintenance

- Run `pnpm run ci` before you commit. It runs lint, type check, production build, and the `pa11y-ci` accessibility check on every built page.
- If the Chromium download fails for `pa11y-ci`, use the installed Chromium.
- No unit tests exist.
