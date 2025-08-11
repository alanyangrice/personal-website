import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", weight: ["400", "600"], variable: "--font-inter" });
const newsreader = Newsreader({ subsets: ["latin"], display: "swap", weight: ["600"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Alan Yang",
  description:
    "Minimal one-page portfolio for Alan Yang: experience, projects, and contact.",
  icons: {
    icon: "/ASCII_DNA_Helix.png",
    apple: "/ASCII_DNA_Helix.png",
    shortcut: "/ASCII_DNA_Helix.png",
  },
  openGraph: {
    title: "Alan Yang",
    description:
      "Minimal one-page portfolio for Alan Yang: experience, projects, and contact.",
    url: "https://acyang.xyz", // TODO: replace with real canonical (e.g., https://alanyang.dev)
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Yang",
    description:
      "Minimal one-page portfolio for Alan Yang: experience, projects, and contact.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://localhost") // harmless default; Vercel will override
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${newsreader.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
