import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Space_Grotesk, Rubik_Doodle_Shadow } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://glenrioariesto.com"),
  title: {
    default: "Glen Rio Aristo | Senior Fullstack Developer & AI Expert",
    template: "%s | Glen Rio Aristo"
  },
  description: "Senior Fullstack Developer specializing in Next.js, AI integration, and scalable web architectures. Building high-performance digital products that drive results.",
  keywords: [
    "Glen Rio Aristo",
    "Fullstack Developer",
    "React Engineer",
    "Next.js Developer",
    "AI Specialist",
    "Software Engineer Portfolio",
    "Hire Fullstack Developer",
    "Web Performance Expert",
    "Digital Product Consultant"
  ],
  authors: [{ name: "Glen Rio Aristo" }],
  creator: "Glen Rio Aristo",
  openGraph: {
    title: "Glen Rio Aristo | Fullstack Developer & AI Specialist",
    description: "Hire a professional Fullstack Developer and AI Expert for your next project. Explore portfolio and services.",
    url: "https://glenrioariesto.com",
    siteName: "Glen Rio Aristo Portfolio",
    images: [
      {
        url: "/assets/profile.webp",
        width: 1200,
        height: 630,
        alt: "Glen Rio Aristo - Fullstack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glen Rio Aristo | Fullstack Developer Portfolio",
    description: "Building innovative web solutions with Next.js and AI. Check out my latest projects and services.",
    images: ["/assets/profile.webp"],
    creator: "@glenrioariesto", // Replace with actual handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder", // User should replace this later
  },
  icons: {
    icon: [
      { url: "/assets/logo.webp" },
      { url: "/assets/logo.webp", sizes: "32x32", type: "image/webp" },
    ],
    apple: [
      { url: "/assets/logo.webp" },
    ],
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

import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});



import { NavbarProvider } from "@/context/NavbarContext";
import ScrollProgress from "@/components/ScrollProgress";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Glen Rio Aristo",
    "url": "https://glenrioariesto.com",
    "image": "https://glenrioariesto.com/assets/profile.webp",
    "jobTitle": "Senior Fullstack Developer",
    "description": "Senior Fullstack Developer specializing in Next.js, AI, and modern web architectures.",
    "sameAs": [
      "https://github.com/glenrioariesto",
      "https://linkedin.com/in/glenrioariesto"
    ]
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${rubikDoodleShadow.variable} ${inter.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans font-light bg-background-primary text-gray-900 scroll-smooth snap-y snap-mandatory no-scrollbar overflow-x-hidden">
        <ScrollProgress />
        <NavbarProvider>
          <Navbar />
          {children}
          <Footer />
        </NavbarProvider>
      </body>
    </html>
  );
}
