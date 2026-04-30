import { describe, expect, it } from "vitest";
import { formatEuro, formatNumberFr } from "@/lib/utils";

describe("formatEuro", () => {
  it("formats number as EUR fr-FR", () => {
    expect(formatEuro(5.9)).toMatch(/5,90/);
  });

  it("formats string with comma", () => {
    expect(formatEuro("9,90 €")).toMatch(/9,90/);
  });

  it("formats integer", () => {
    expect(formatEuro(10)).toMatch(/10,00/);
  });
});

describe("formatNumberFr", () => {
  it("formats with space separators", () => {
    const result = formatNumberFr(10000);
    expect(result).toMatch(/10.*000/);
  });

  it("formats small numbers", () => {
    const result = formatNumberFr(6428);
    expect(result).toMatch(/6.*428/);
  });
});
