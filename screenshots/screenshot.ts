import { chromium } from "playwright";

async function waitForServer(url: string, maxRetries = 30): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch(url);
      if (resp.ok) return true;
    } catch {
      /* server not ready yet */
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  return false;
}

async function main() {
  const baseURL = "http://localhost:3000";
  const outDir = "screenshots";

  console.log("Waiting for dev server at", baseURL);
  const ready = await waitForServer(baseURL);
  if (!ready) {
    console.error("Dev server did not start in time (60s timeout). Aborting.");
    process.exit(1);
  }
  console.log("✓ Server is ready\n");

  const browser = await chromium.launch();

  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "desktop-1080p", width: 1920, height: 1080 },
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

    await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);

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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
