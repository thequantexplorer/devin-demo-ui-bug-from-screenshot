// Usage: npm run screenshot -- --width 390 --out docs/after.png
const path = require('node:path');
const { chromium } = require('@playwright/test');
const { start } = require('../server');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}

(async () => {
  const width = Number(arg('width', 390));
  const out = path.resolve(arg('out', 'docs/screenshot.png'));
  const server = await start(0, '127.0.0.1');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 844 }, deviceScaleFactor: 2 });
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  // Crop to the viewport width so the image looks like the phone screen, even when the page scrolls sideways.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.screenshot({ path: out, fullPage: true, clip: { x: 0, y: 0, width, height } });
  await browser.close();
  server.close();
  console.log(`Saved ${out} (${width}px wide)`);
})();
