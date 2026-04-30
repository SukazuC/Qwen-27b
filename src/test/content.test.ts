import { describe, expect, it } from "vitest";
import { site } from "@/lib/content/site";
import { products } from "@/lib/content/products";
import { ingredients } from "@/lib/content/ingredients";
import { comparison } from "@/lib/content/comparison";

describe("site content", () => {
  it("has no duplicate nav hrefs", () => {
    const hrefs = site.nav.map((n) => n.href);
    const unique = new Set(hrefs);
    expect(unique.size).toBe(hrefs.length);
  });

  it("has at least 5 hero badges", () => {
    expect(site.hero.badges.length).toBeGreaterThanOrEqual(5);
  });
});

describe("products content", () => {
  it("has exactly 3 flavors", () => {
    expect(products.flavors.length).toBe(3);
  });

  it("each flavor has required fields", () => {
    for (const f of products.flavors) {
      expect(f.id).toBeDefined();
      expect(f.name).toBeDefined();
      expect(f.asset).toBeDefined();
      expect(f.cta).toBeDefined();
    }
  });
});

describe("ingredients content", () => {
  it("all ingredients have legalReview flag", () => {
    for (const ing of ingredients.items) {
      expect(typeof ing.legalReview).toBe("boolean");
    }
  });

  it("potassium canonical amount is 150 mg", () => {
    const potassium = ingredients.items.find((i) => i.key === "potassium");
    expect(potassium).toBeDefined();
    expect(potassium?.amount).toContain("150 mg");
  });
});

describe("comparison content", () => {
  it("all products have same metric keys", () => {
    const metrics = ["sugar", "sodium", "potassium", "vitamins", "price"];
    for (const p of comparison.products) {
      for (const m of metrics) {
        const product = p as Record<string, unknown>;
        expect(product[m]).toBeDefined();
      }
    }
  });

  it("HYDRE is highlighted", () => {
    const hydre = comparison.products.find((p) => p.id === "hydre");
    expect(hydre).toBeDefined();
    expect(hydre?.highlighted).toBe(true);
  });

  it("has exactly 3 products", () => {
    expect(comparison.products.length).toBe(3);
  });
});
