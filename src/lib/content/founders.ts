export const founders = {
  sectionTitle: "Agora des",
  sectionEmphasis: "Fondateurs.",
  subtitle: "Ensemble, façonnons l'hydratation de demain.",
  passportImage: "/assets/source/founder-passport.png",
  passportAlt: "Passe fondateur HYDRE Nutrition.",
  demoProfile: {
    founderId: "HYDRE-6428",
    memberSince: "12.04.2024",
    points: 2430,
    headerPointsSignedOut: 100,
    voteActive: 1,
    foundersCount: 6428,
    foundersGoal: 10000,
  },
  statCards: [
    {
      value: "2 430 POINTS",
      label: "Voir l'historique",
    },
    {
      value: "1 VOTE ACTIF",
      label: "Utiliser mon vote",
    },
    {
      value: "6 428 / 10 000",
      label: "Rejoindre plus d'esprits",
    },
  ],
  nextVote: {
    title: "Nectar 003",
    subtitle: "Mangue sauvage & fleur de sel",
    status: "Dégustation en cours",
    cta: "Découvrir & voter",
    countdownLabel: "Fin du vote dans",
    countdownMock: "6 j 12 h",
  },
  roadmap: [
    { step: 1, label: "Recherche des actifs", description: "" },
    { step: 2, label: "Tests & formulation", description: "" },
    { step: 3, label: "Tests goût & stabilité", description: "" },
    { step: 4, label: "Design & expérience", description: "" },
    { step: 5, label: "Production & lancement", description: "" },
  ],
} as const;

export type FoundersConfig = typeof founders;
