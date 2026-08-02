import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono, Caveat } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "ŞÜPHELİ — Dijital Dedektif Oyunu",
  description:
    "Herkes bir şey saklıyor. Kanıtları incele, şüphelileri sorgula, katili bul. Ücretsiz, çok vakalı dijital dedektiflik oyunu.",
};

export const viewport: Viewport = {
  themeColor: "#141212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} ${plexMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
