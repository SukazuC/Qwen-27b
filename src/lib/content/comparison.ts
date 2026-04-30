export const comparison = {
  sectionTitle: "L'Arène",
  sectionEmphasis: "Comparative.",
  subtitle: "La formule la plus complète au meilleur prix.",
  asset: "/assets/source/comparison-arena-scene.png",
  tabs: [
    { id: "composition", label: "Composition" },
    { id: "prix", label: "Prix" },
  ],
  products: [
    {
      id: "hydratis",
      name: "Hydratis",
      role: "CHALLENGER",
      image: "/assets/source/hydratis-packshot.png",
      alt: "Tube Hydratis.",
      price: "9,90 €",
      sugar: "1,8 g",
      sodium: "60 mg",
      potassium: "150 mg",
      vitamins: "0,0 mg",
      highlighted: false,
    },
    {
      id: "hydre",
      name: "HYDRE Nutrition",
      role: "CHAMPION",
     image: "/assets/source/berry-can-white.png",
       alt: "Boîte HYDRE Nutrition.",
      price: "5,90 €",
      sugar: "0,0 g",
      sodium: "280 mg",
      potassium: "150 mg",
      vitamins: "89,2 mg",
      highlighted: true,
    },
    {
      id: "decathlon",
      name: "Decathlon",
      role: "CHALLENGER",
      image: "/assets/source/decathlon-packshot.png",
      alt: "Tube Decathlon.",
      price: "6,99 €",
      sugar: "0,0 g",
      sodium: "250 mg",
      potassium: "100 mg",
      vitamins: "25,2 mg",
      highlighted: false,
    },
  ],
  footnote: "Données issues des informations nutritionnelles moyennes pour 20 comprimés.",
} as const;

/*
 * LEGAL NOTE: Competitor comparison values must be checked against
 * current public product data before launch. See docs/claims-review.md.
 */

export type ComparisonConfig = typeof comparison;
