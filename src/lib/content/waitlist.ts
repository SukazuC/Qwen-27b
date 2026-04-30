export const waitlistContent = {
  sectionTitle: "Rejoignez l'Agora.",
  desktopBody:
    "Entrez dans le cercle des fondateurs et accédez aux drops en avant-première. Votre voix façonne l'avenir d'HYDRE.",
  mobileBody:
    "Participez à la construction de HYDRE Nutrition et façonnez la performance de demain.",
  emailPlaceholder: "vous@email.com",
  cta: "Rejoindre le mouvement",
  benefits: [
    "Statut co-fondateur",
    "Votes R&D",
    "Protocoles test",
    "Drops en avant-première",
  ],
  privacyLine:
    "Vos données sont protégées. Désinscription en 1 clic à tout moment.",
} as const;

export type WaitlistContent = typeof waitlistContent;
