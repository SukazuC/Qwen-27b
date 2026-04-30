import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/HYDRE/);
  });

  test("h1 is visible", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
  });

  test("announcement bar is visible", async ({ page }) => {
    await page.goto("/");
    const bar = page.locator('[role="banner"]').first();
    await expect(bar).toBeVisible();
  });

  test("primary CTA scrolls to agora section", async ({ page }) => {
    await page.goto("/");
    const primaryCta = page.getByRole("link", { name: /devenir fondateur/i });
    await primaryCta.click();
    await page.waitForTimeout(500);
    const agora = page.locator("#agora");
    await expect(agora).toBeVisible();
  });

  test("secondary CTA scrolls to formule section", async ({ page }) => {
    await page.goto("/");
    const secondaryCta = page.getByRole("link", { name: /explorer la formule/i });
    await secondaryCta.click();
    await page.waitForTimeout(500);
    const formule = page.locator("#formule");
    await expect(formule).toBeVisible();
  });

  test("ingredient selector changes active card", async ({ page }) => {
    await page.goto("/#formule");
    const sodiumBtn = page.getByRole("button", { name: /Na/ }).first();
    await sodiumBtn.click();
    await page.waitForTimeout(300);
    const sodiumLabel = page.getByText("Sodium");
    await expect(sodiumLabel).toBeVisible();
  });

  test("comparison tabs switch between composition and prix", async ({ page }) => {
    await page.goto("/#analyse");
    const prixTab = page.getByRole("tab", { name: /prix/i });

    // Composition should be visible by default
    const compositionPanel = page.locator("#tabpanel-composition");
    await expect(compositionPanel).toBeVisible();

    // Click prix tab
    await prixTab.click();
    await page.waitForTimeout(300);

    // Prix panel should be visible, composition hidden
    const prixPanel = page.locator("#tabpanel-prix");
    await expect(prixPanel).toBeVisible();
    await expect(compositionPanel).not.toBeVisible();
  });

  test("waitlist shows error for invalid email", async ({ page }) => {
    await page.goto("/#agora");
    const emailInput = page.getByLabel(/adresse email/i);
    await emailInput.fill("invalid-email");
    const submitBtn = page.getByRole("button", { name: /rejoindre/i });
    await submitBtn.click();
    await page.waitForTimeout(500);
    const error = page.getByText(/invalide/i);
    await expect(error).toBeVisible();
  });

  test("waitlist shows success for valid email", async ({ page }) => {
    await page.goto("/#agora");
    const emailInput = page.getByLabel(/adresse email/i);
    await emailInput.fill("test+e2e@example.com");
    const submitBtn = page.getByRole("button", { name: /rejoindre/i });
    await submitBtn.click();
    await page.waitForTimeout(1000);
    const success = page.getByText(/bienvenue|déjà inscrit/i);
    await expect(success).toBeVisible();
  });
});
