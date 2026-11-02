# acme-pricing-page

The pricing page for Acme Notes. Plain HTML and CSS in `public/`, served by a small Node server with no dependencies.

```sh
npm install
npm start                                            # http://localhost:4173
npx playwright install chromium                      # once, for the tests
npm test                                             # layout tests at 320, 390, 768 and 1280px wide
npm run screenshot -- --width 390 --out docs/after.png
```

The **Layout tests** GitHub Action runs `npm test` on every pull request.

---

This repo is a starter for a Devin demo. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for setup and the prompt.
