"use client"

import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";
import EmblaCarousel from "./EmblaCarousel";
import MobileShowcase from "./MobileShowcase";
import { EmblaOptionsType } from "embla-carousel";

export interface Project {
  id: number;
  title: string;
  category: string;
  date: string; // Supports "Oct 2024" or "Oct 2024 - Jan 2025"
  role: string;
  description: string;
  images: string[];
  techStack: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  links?: { label: string; url: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Landing Page Ads",
    category: "Web Application",
    date: "Oct 2024 - Now",
    role: "Lead Full Stack Developer",
    description: "Built and continuously optimizing a high-conversion landing page for advertising campaigns, SEO best practices, and performance tuning to maximize user engagement and lead generation.",
    images: [
      "/assets/project1/cover-1.webp",
      "/assets/project1/cover-2.webp",
      // "/assets/project1/cover-3.png",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind",],
    stats: [{ label: "Conversion rate", value: "+150%" }],
    links: [
      { label: "Ads Gamparai", url: "https://gamparai.com" },
    ]
  },
  {
    id: 2,
    title: "Platform Course AI Art",
    category: "SaaS Product",
    date: "Sep 2024 - Now",
    role: "Lead Full Stack Developer",
    description: "Developed and maintaining a full-featured SaaS course platform for AI-generated art, including user authentication, course management dashboard, video streaming, Midtrans payment gateway integration, and automated email notifications.",
    images: [
      "/assets/project2/cover-1.webp",
      // "/assets/project2/2.webp"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind", "Postgres", "pgAdmin4", "Restfull API", "ORM Prisma", "Midtrans Payment Gateway", "JWT"],
    stats: [
      { label: "Users", value: "6k+" },
      { label: "Repeat Order", value: "2.5k+" },
    ],
    links: [
      { label: "Live App", url: "https://aigensee.id" }
    ]
  },
  {
    id: 3,
    title: "InstaScheduler",
    category: "AI Tool",
    date: "Aug 2024",
    role: "Full Stack Developer",
    description: "Built an AI-powered Instagram content scheduler that leverages OpenAI API to automatically generate captions, hashtags, and optimal posting schedules, with a React dashboard for content calendar management.",
    images: [
      // "/assets/project3/1.webp",
      // "/assets/project3/2.webp",
      // "/assets/project3/3.webp"
    ],
    techStack: ["OpenAI API", "Python", "FastAPI", "React"],
    stats: [{ label: "Generated", value: "1M+ Words" }]
    // No links for this one (private)
  },
];

const OPTIONS: EmblaOptionsType = { loop: true, align: 'center' }

import { useNavbarContext } from "@/context/NavbarContext";

const Experience = () => {
  const { isHidden } = useNavbarContext();

  return (
    <section id="showcase" className="relative flex flex-col overflow-hidden -mt-20 pt-20">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBE9D4]/90 via-[#FBE9D4]/40 to-transparent -z-10" />

      <motion.div
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto text-center px-4 my-12 relative z-10"
      >
        <ShinyText
          text="My Experience"
          speed={5}
          className="text-3xl md:text-6xl font-grotesk font-bold text-amber-900 tracking-tight"
        />
      </motion.div>

      <div className="hidden lg:block">
        <EmblaCarousel projects={PROJECTS} options={OPTIONS} />
      </div>
      <MobileShowcase projects={PROJECTS} />
    </section>
  );
}

export default Experience
