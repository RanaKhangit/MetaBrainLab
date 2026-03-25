import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StructuralGrid } from "@/components/layout/structural-grid";
import { CookieNotice } from "@/components/shared/cookie-notice";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metabrainlabs.com"),
  title: {
    default: "MetaBrain Labs \u2014 Engineering the Future of Human Intelligence",
    template: "%s | MetaBrain Labs",
  },
  description:
    "MetaBrain Labs is building integrated cognitive enhancement infrastructure. Learn faster. Remember better. Focus deeper. Decide clearer.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MetaBrain Labs",
    images: [{ url: "/logos/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-cognitive-teal focus:px-4 focus:py-2 focus:text-sovereign-navy focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Navbar />
        <StructuralGrid />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
