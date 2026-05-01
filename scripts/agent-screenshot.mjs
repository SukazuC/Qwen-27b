import { chromium } from '@playwright/test';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://127.0.0.1:3000');
  await p.waitForTimeout(1500);

  const el = await p.$('#formule');
  if (el) {
    await el.evaluate(node => node.scrollIntoView());
    await p.waitForTimeout(500);
    await el.screenshot({ path: '.agent/desktop-formule.png', type: 'png' });
    console.log('section screenshot done');
  } else {
    console.log('section not found');
  }

  const p2 = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p2.goto('http://127.0.0.1:3000');
  await p2.waitForTimeout(1500);
  const el2 = await p2.$('#formule');
  if (el2) {
    await el2.evaluate(node => node.scrollIntoView());
    await p2.waitForTimeout(500);
    await el2.screenshot({ path: '.agent/desktop-1080p-formule.png', type: 'png' });
    console.log('1080p section screenshot done');
  }

  await b.close();
})();
