import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Space_Grotesk, Rubik_Doodle_Shadow } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://glenrioariesto.com"), // Replace with your actual production domain
  title: "Glen Rio Aristo - Fullstack Developer & AI Enthusiast",
  description: "Explore the portfolio of Glen Rio Aristo, a Fullstack Developer specializing in innovative web applications and AI-driven solutions.",
  openGraph: {
    title: "Glen Rio Aristo - Fullstack Developer",
    description: "Fullstack Developer specializing in Next.js, AI, and modern web tech.",
    url: "https://glenrioariesto.com", // Placeholder
    siteName: "Glen Rio Aristo Portfolio",
    images: [
      {
        url: "/assets/profile.webp",
        width: 800,
        height: 800,
        alt: "Glen Rio Aristo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glen Rio Aristo - Fullstack Developer",
    description: "Fullstack Developer specializing in Next.js, AI, and modern web tech.",
    images: ["/assets/profile.webp"],
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const rubikDoodleShadow = Rubik_Doodle_Shadow({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rubik-doodle",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${rubikDoodleShadow.variable}`}>
      <body className="bg-background-primary text-gray-900 scroll-smooth">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
