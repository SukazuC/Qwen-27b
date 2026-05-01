export const founders = {
  sectionTitle: "Agora des",
  sectionEmphasis: "Fondateurs.",
  subtitle: "Ensemble, nous forgeons l'avenir de l'hydratation.",
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
      label: "Vos points fondateurs",
    },
    {
      value: "1 VOTE ACTIF",
      label: "Faîtes entendre votre voix",
    },
    {
      value: "6 428 / 10 000",
      label: "Rejoignez l'élite",
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
    { step: 1, label: "IDÉATION", sublabel: "Collecte d'idées" },
    { step: 2, label: "RECHERCHE", sublabel: "Formulation & tests" },
    { step: 3, label: "DÉGUSTATION", sublabel: "Tests fondateurs" },
    { step: 4, label: "LANCEMENT", sublabel: "Production & envoi" },
  ],
} as const;

export type FoundersConfig = typeof founders;
