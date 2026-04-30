export const ingredients = {
  sectionTitle: "Le temple des électrolytes.",
  sectionEmphasisMobile: "6 électrolytes essentiels. Zéro compromis.",
  sectionBodyDesktop:
    "Six électrolytes essentiels et vitamines. Une formule précise. Une hydratation totale.",
  instruction: "Cliquez sur un élément pour découvrir son rôle.",
  footerLine: "UNE FORMULE TRANSPARENTE. AUCUN COMPROMIS.",
  defaultActive: "potassium",
  assets: {
    temple: "/assets/source/electrolyte-temple.png",
    background: "/assets/source/electrolyte-temple-background.png",
  },
  items: [
    {
      key: "sodium",
      symbol: "Na",
      label: "Sodium",
      amount: "280 mg / comprimé",
      role: "Équilibre hydrique",
      benefit: "Contribue à l'équilibre des apports en électrolytes.",
      legalReview: true,
      position: { x: 50, y: 13 },
    },
    {
      key: "potassium",
      symbol: "K+",
      label: "Potassium",
      amount: "150 mg / comprimé",
      role: "Équilibre électrolytique",
      benefit: "Soutient l'hydratation et la fonction musculaire.",
      legalReview: true,
      position: { x: 22, y: 30 },
    },
    {
      key: "magnesium",
      symbol: "Mg",
      label: "Magnésium",
      amount: "À confirmer",
      role: "Fonction musculaire",
      benefit: "Contribue au fonctionnement musculaire normal.",
      legalReview: true,
      position: { x: 78, y: 30 },
    },
    {
      key: "zinc",
      symbol: "Zn",
      label: "Zinc",
      amount: "À confirmer",
      role: "Métabolisme",
      benefit: "Contribue à protéger les cellules contre le stress oxydatif.",
      legalReview: true,
      position: { x: 20, y: 63 },
    },
    {
      key: "vitaminC",
      symbol: "C",
      label: "Vitamine C",
      amount: "À confirmer",
      role: "Protection cellulaire",
      benefit: "Contribue à réduire la fatigue.",
      legalReview: true,
      position: { x: 82, y: 63 },
    },
    {
      key: "vitaminsB",
      symbol: "B",
      label: "Vitamines B6 · B12",
      amount: "À confirmer",
      role: "Énergie",
      benefit: "Contribue au métabolisme énergétique normal.",
      legalReview: true,
      position: { x: 50, y: 82 },
    },
  ],
} as const;

/*
 * LEGAL NOTE: All ingredient benefits marked legalReview: true require
 * legal/regulatory review before launch. Claims must comply with
 * EU Regulation (EC) No 1924/2006 on nutrition and health claims.
 *
 * TODO: Confirm potassium amount — 150 mg used here, reference screenshots
 * show conflicting values (150 mg vs 200 mg). See docs/architecture/decisions.md.
 */

export type IngredientsConfig = typeof ingredients;
