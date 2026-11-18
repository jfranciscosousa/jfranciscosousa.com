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
- Set `PUPPETEER_EXECUTABLE_PATH` to an installed Chromium and `PUPPETEER_SKIP_DOWNLOAD=true` to reuse it. CI uses the Chrome setup action's output path.
- Keep the pnpm versions in `.tool-versions` and `package.json` in sync. GitHub Actions reads the Node and pnpm versions from `.tool-versions`.
- Without `HARDCOVER_TOKEN`, the build uses a local book fixture. No unit or end-to-end test suite exists.
- The `@tailwindcss/typography` override selects `postcss-selector-parser@6.1.6` because typography pins the vulnerable `6.0.10` ([GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)). Remove the override when typography uses a patched version. Checked 2026-11-18.
- `picomatch@2.3.2` and `4.0.7` have no patch for [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf). Astro, Vite, and build tools use it during development and builds. The public site serves static files and does not accept glob patterns. Recheck when a patched release is available. Checked 2026-11-18.
- Astro pins `get-tsconfig@5.0.0-beta.6`. Rolldown's optional WASI binding pins `@emnapi/core` and `@emnapi/runtime` at `2.0.0-beta.2`. These are upstream pins. Recheck when the parent packages support stable releases. Checked 2026-11-18.
- Pa11y resolves to `puppeteer@25.17.0`, which pins `chromium-bidi@157.0.8090-0`. Recheck Puppeteer and its Chrome BiDi dependency when `25.18.1` clears the five-day release-age policy on 2026-11-22. Checked 2026-11-18.
