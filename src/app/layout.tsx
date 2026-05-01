import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import "@/styles/section-backgrounds.css";

export const viewport: Viewport = {
  themeColor: "#f4ece4",
  width: "device-width",
  initialScale: 1,
};

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HYDRE Nutrition — L'électrolyte français. Zéro sucre.",
  description:
    "Hydratation premium avec 6 électrolytes essentiels et 3 vitamines. Zéro sucre. Pensé pour performer.",
  applicationName: "HYDRE Nutrition",
  authors: [{ name: "HYDRE Nutrition" }],
  keywords: [
    "électrolyte",
    "hydratation",
    "zéro sucre",
    "sport",
    "performance",
    "france",
    "vegan",
  ],
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HYDRE Nutrition — L'électrolyte français. Zéro sucre.",
    description:
      "Hydratation premium avec 6 électrolytes essentiels et 3 vitamines. Zéro sucre. Pensé pour performer.",
    type: "website",
    locale: "fr_FR",
    siteName: "HYDRE Nutrition",
  },
  twitter: {
    card: "summary_large_image",
    title: "HYDRE Nutrition — L'électrolyte français. Zéro sucre.",
    description:
      "Hydratation premium avec 6 électrolytes essentiels et 3 vitamines.",
  },
  other: {
    "og:locale": "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr-FR"
      className={`${bodoniModa.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HYDRE Nutrition",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://hydrenutrition.fr",
              logo: "/assets/source/hydre-wordmark.png",
              sameAs: [],
              description:
                "Marque française d'électrolytes premium zéro sucre, pensés pour performer.",
            }),
          }}
        />
      </head>
      <body className="font-body min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
        {children}
      </body>
    </html>
  );
}
