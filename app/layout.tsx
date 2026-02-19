import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Space_Grotesk, Rubik_Doodle_Shadow } from "next/font/google";

export const metadata: Metadata = {
  title: "Glen Rio Aristo - Portfolio",
  description: "Portfolio Glen Rio Aristo",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300"], // Light (300)
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
    <html lang="id" className={`${spaceGrotesk.variable} ${rubikDoodleShadow.variable}`}>
      <body className="bg-dots text-white scroll-smooth">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
