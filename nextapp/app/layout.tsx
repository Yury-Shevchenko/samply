import type { Metadata } from "next";
import { Space_Grotesk, Inter, Caveat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import CookieNotice from "./components/CookieNotice";
import { TranslationProvider } from "./components/TranslationProvider";
import { getLocale } from "@/lib/i18n.server";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samply",
  description: "Experience sampling method research platform",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Samply — Experience Sampling Research",
    description: "The schedule, not the survey. Samply runs the cron and routes the tap to Qualtrics, REDCap, or your URL. Free for academic use.",
    images: [{ url: "/og-cover.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samply — Experience Sampling Research",
    description: "The schedule, not the survey. Free for academic use.",
    images: ["/og-cover.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <TranslationProvider locale={locale}>
          <Nav />
          {children}
          <CookieNotice />
        </TranslationProvider>
      </body>
    </html>
  );
}
