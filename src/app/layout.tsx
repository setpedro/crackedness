import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const SpaceGrotesk = JetBrains_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "CrackedLyzer",
  description: "Analyze your level of crackedness",
  openGraph: {
    title: "CrackedLyzer",
    description: "Analyze your level of crackedness",
    images: [
      {
        url: "https://crackedlyzer.vercel.app/meta.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_setpedro",
    creator: "@_setpedro",
    title: "CrackedLyzer",
    description: "Analyze your level of crackedness",
    images: [
      {
        url: "https://crackedlyzer.vercel.app/meta.png",
        alt: "CrackedLyzer - Analyze your level of crackedness",
        width: 1200,
        height: 628,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${SpaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
