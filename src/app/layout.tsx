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
    title: "CrackedLyzer",
    description: "Analyze your level of crackedness",
    card: "summary_large_image",
    images: ["https://crackedlyzer.vercel.app/meta.png"],
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
