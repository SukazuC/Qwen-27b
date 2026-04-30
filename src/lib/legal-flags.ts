export const LEGAL_FLAGS = {
  zeroSugar: {
    claim: "Zéro sucre",
    status: "needs-validation",
    note: "Must match product nutritional declaration.",
  },
  vegan: {
    claim: "Vegan",
    status: "needs-validation",
    note: "Must be substantiated with certification or full supply chain review.",
  },
  madeInFrance: {
    claim: "Fabriqué en France",
    status: "needs-validation",
    note: "Must meet EU 'made in' origin labeling requirements.",
  },
  preventsCramps: {
    claim: "prévenir les crampes",
    status: "blocked",
    note: "Should NOT be used unless legal/regulatory approval confirms it.",
  },
  competitorComparison: {
    claim: "All competitor comparison values",
    status: "needs-validation",
    note:
      "Values must be verified against current public product data before launch.",
  },
  potassiumAmount: {
    claim: "Potassium: 150 mg vs 200 mg",
    status: "needs-confirmation",
    note:
      "Reference screenshots conflict. 150 mg used as canonical. Confirm with product spec.",
  },
} as const;
