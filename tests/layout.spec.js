const { test, expect } = require('@playwright/test');

const WIDTHS = [320, 390, 768, 1280];

for (const width of WIDTHS) {
  test.describe(`pricing page at ${width}px wide`, () => {
    test.use({ viewport: { width, height: 900 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('pricing cards do not overlap', async ({ page }) => {
      const cards = await page.locator('.plan').evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return { name: el.querySelector('h2').textContent, left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        }),
      );
      expect(cards).toHaveLength(3);

      const overlaps = [];
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          const a = cards[i];
          const b = cards[j];
          if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) {
            overlaps.push(`${a.name} overlaps ${b.name}`);
          }
        }
      }
      expect(overlaps).toEqual([]);
    });

    test('page does not scroll sideways', async ({ page }) => {
      const { scrollWidth, viewportWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('button labels are not cut off', async ({ page }) => {
      const clipped = await page.locator('.cta').evaluateAll((els) =>
        els
          .filter((el) => el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
          .map((el) => el.textContent.trim()),
      );
      expect(clipped).toEqual([]);
    });
  });
}
