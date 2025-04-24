import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Glen Rio Aristo - Portfolio",
  description: "Portfolio Glen Rio Aristo",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300"], // Light (300)
  variable: "--font-space-grotesk",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={spaceGrotesk.variable}>
      <body className="bg-dots text-white scroll-smooth">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
