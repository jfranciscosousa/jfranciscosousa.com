# Runtime and dependency maintenance

## Build, CI, and deployment

- Run `pnpm run ci` before you commit. It runs lint, type check, production build, and the `pa11y-ci` accessibility check on every built page. No unit or end-to-end test suite exists.
- Set `PUPPETEER_EXECUTABLE_PATH` to an installed Chromium and `PUPPETEER_SKIP_DOWNLOAD=true` to reuse it. CI uses the Chrome setup action's output path and installs dependencies with `--frozen-lockfile`.
- Keep the pnpm versions in `.tool-versions` and `package.json` in sync. GitHub Actions reads the Node and pnpm versions from `.tool-versions`.
- Without `HARDCOVER_TOKEN`, the build uses a local book fixture.
- The site deploys static files on Vercel. The 2026-11-18 maintenance run verified the build locally, not Vercel project settings or the live Hardcover integration.

## Audit and temporary pins

- The 2026-11-18 audit went from three findings to one. Astro 7.4.11 includes the fix for [the Astro image endpoint advisory](https://github.com/advisories/GHSA-r3h5-4585-7x3w). GitHub Dependabot alerts were disabled when checked.
- The `@tailwindcss/typography` override selects `postcss-selector-parser@6.1.6` because typography pins the vulnerable `6.0.10` ([GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)). Remove the override when typography uses a patched version. Checked 2026-11-18.
- Both full and production dependency audits flag `picomatch@2.3.2` and `4.0.7` for [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf). No patch is available. Astro, Vite, and build tools use it during development and builds. The public site serves static files and does not accept glob patterns. Recheck when a patched release is available. Checked 2026-11-18.
- Astro pins `get-tsconfig@5.0.0-beta.6`. Rolldown's optional WASI binding pins `@emnapi/core` and `@emnapi/runtime` at `2.0.0-beta.2`. These are upstream pins. Recheck when the parent packages support stable releases. Checked 2026-11-18.
- Pa11y resolves to `puppeteer@25.17.0`, which pins `chromium-bidi@157.0.8090-0`. Recheck Puppeteer and its Chrome BiDi dependency when `25.18.1` clears the five-day release-age policy on 2026-11-22. Checked 2026-11-18.
- The Vite `server.fs.strict: false` workaround was removed on 2026-11-18. Local smoke checks passed with the default file restrictions restored.
