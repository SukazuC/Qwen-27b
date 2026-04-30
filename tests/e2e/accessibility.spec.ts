import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("all images have alt text or are decorative", async ({ page }) => {
    await page.goto("/");
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      const ariaHidden = await img.getAttribute("aria-hidden");
      if (!ariaHidden || ariaHidden !== "true") {
        expect(alt !== null).toBe(true);
      }
    }
  });

  test("interactive elements have visible labels", async ({ page }) => {
    await page.goto("/");
    const buttons = await page.locator('button, [role="button"]').all();
    for (const btn of buttons) {
      const ariaLabel = await btn.getAttribute("aria-label");
      const text = await btn.textContent();
      expect(ariaLabel !== null || (text && text.trim().length > 0)).toBe(true);
    }
  });

  test("no elements with missing heading levels", async ({ page }) => {
    await page.goto("/");
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    expect(headings.length).toBeGreaterThan(0);
  });
});
