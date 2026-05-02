import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 15000 });

await page.evaluate(() => {
  window.scrollTo(0, 3159);
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: ".agent/latest-screenshot.png", fullPage: false });
await browser.close();
