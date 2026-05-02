import { chromium } from "@playwright/test";

const resolutions = [
  { width: 1280, height: 720, label: "1280x720" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1920, height: 1080, label: "1920x1080" },
];

const browser = await chromium.launch();

for (const res of resolutions) {
  const page = await browser.newPage({ viewport: { width: res.width, height: res.height } });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 15000 });

  await page.evaluate(() => {
    document.getElementById("analyse")?.scrollIntoView({ block: "center" });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: `.agent/arena-${res.label}.png`, fullPage: false });
  await page.close();
}

await browser.close();
