import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ali Haider — AI Specialist",
  description:
    "Portfolio of Ali Haider, AI Specialist from Lahore building intelligent systems and vibe-coded products.",
  keywords: [
    "AI Specialist",
    "LangChain",
    "OpenAI",
    "Next.js",
    "Machine Learning",
    "Lahore",
    "Pakistan",
    "Vibe Coder",
  ],
  authors: [{ name: "Ali Haider" }],
  creator: "Ali Haider",
  openGraph: {
    title: "Ali Haider — AI Specialist",
    description:
      "Portfolio of Ali Haider, AI Specialist from Lahore building intelligent systems and vibe-coded products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Haider — AI Specialist",
    description:
      "Portfolio of Ali Haider, AI Specialist from Lahore building intelligent systems and vibe-coded products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
