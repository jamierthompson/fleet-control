import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// JetBrains Mono is the only font in the Fleet Control design system.
// Weights 300–800 are all in use across the UI (see fleet-control-tokens.md).
// next/font self-hosts the font at build time, eliminating render-blocking
// Google Fonts requests and preventing layout shift.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fleet Control · Now",
  description: "Terminal-inspired security operations dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
