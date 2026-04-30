export const site = {
  brandName: "HYDRE Nutrition",
  shortBrandName: "HYDRE",
  locale: "fr-FR",
  nav: [
    { label: "Produits", href: "#produits" },
    { label: "Ingrédients", href: "#formule" },
    { label: "Analyse", href: "#analyse" },
    { label: "Parrainage", href: "#parrainage" },
    { label: "Fondateurs", href: "#fondateurs" },
  ],
  announcementBar: [
    "MARQUE FRANÇAISE · VEGAN",
    "LIVRAISON OFFERTE DÈS 30 €",
    "RETOURS 30 JOURS · SATISFAIT OU REMBOURSÉ",
    "-10 % À VIE POUR LES FONDATEURS",
  ],
  hero: {
    titleLines: ["L'électrolyte français.", "Zéro sucre."],
    emphasis: "Pensé pour performer.",
    body: "Hydratation premium avec 6 électrolytes essentiels et 3 vitamines. Zéro compromis sur la composition, tout pour la performance.",
    primaryCta: { label: "Devenir fondateur", href: "#agora" },
    secondaryCta: { label: "Explorer la formule", href: "#formule" },
    badges: [
      "0 g sucre",
      "6 électrolytes",
      "3 vitamines",
      "Fabriqué en France",
      "Vegan",
    ],
  },
} as const;

export type SiteConfig = typeof site;
