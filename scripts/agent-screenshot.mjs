import { chromium } from "@playwright/test";

const [url, outputPath, width, height] = process.argv.slice(2);

if (!url || !outputPath) {
  console.error("Usage: node agent-screenshot.mjs <url> <output> [width] [height]");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: parseInt(width) || 1440, height: parseInt(height) || 900 },
});

await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
await page.screenshot({ path: outputPath, fullPage: false });
await browser.close();
