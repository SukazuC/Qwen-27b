import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const baseURL = "http://localhost:3001";
  const outDir = "screenshots";

  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ];

  const sections = [
    { id: "hero", label: "hero" },
    { id: "produits", label: "produits" },
    { id: "formule", label: "formule" },
    { id: "analyse", label: "analyse" },
    { id: "fondateurs", label: "fondateurs" },
    { id: "agora", label: "agora" },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const fullFilename = `${vp.name}-full-page.png`;
    await page.screenshot({
      path: `${outDir}/${fullFilename}`,
      fullPage: true,
    });
    console.log(`✓ Full page: ${vp.name} (${vp.width}x${vp.height})`);

    for (const section of sections) {
      const el = page.locator(`#${section.id}`);
      const visible = await el.isVisible();
      if (visible) {
        const filename = `${vp.name}-${section.label}.png`;
        await el.screenshot({ path: `${outDir}/${filename}` });
        console.log(`✓ Section: ${vp.name}/${section.label}`);
      } else {
        console.log(`⚠ Section not visible: #${section.id}`);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log("\nDone – screenshots saved to screenshots/");
}

main().catch(console.error);
