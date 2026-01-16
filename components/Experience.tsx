"use client"

import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

export interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  images: string[];
  techStack: string[];
  stats?: {
    label: string;
    value: string;
  };
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Application",
    date: "Oct 2024",
    description: "A full-featured e-commerce platform with real-time inventory management.",
    images: [
      "/assets/project1-1.jpg",
      "/assets/project1-2.jpg",
      "/assets/project1-3.jpg"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    stats: { label: "Sales", value: "+150%" }
  },
  {
    id: 2,
    title: "Finance Dashboard",
    category: "SaaS Product",
    date: "Sep 2024",
    description: "Analytics dashboard for tracking personal finances and investments.",
    images: [
      "/assets/project2-1.jpg",
      "/assets/project2-2.jpg"
    ],
    techStack: ["React", "D3.js", "Node.js", "PostgreSQL"],
    stats: { label: "Users", value: "10k+" }
  },
  {
    id: 3,
    title: "AI Content Generator",
    category: "AI Tool",
    date: "Aug 2024",
    description: "Generates marketing copy and social media posts using GPT-4.",
    images: [
      "/assets/project3-1.jpg",
      "/assets/project3-2.jpg",
      "/assets/project3-3.jpg"
    ],
    techStack: ["OpenAI API", "Python", "FastAPI", "React"],
    stats: { label: "Generated", value: "1M+ Words" }
  },
  {
    id: 4,
    title: "Health & Fitness App",
    category: "Mobile App",
    date: "Jul 2024",
    description: "Cross-platform mobile app for tracking workouts and nutrition.",
    images: [
      "/assets/project4-1.jpg",
      "/assets/project4-2.jpg"
    ],
    techStack: ["React Native", "Firebase", "Redux"],
    stats: { label: "Downloads", value: "50k+" }
  },
  {
    id: 5,
    title: "Real Estate Portal",
    category: "Web Platform",
    date: "Jun 2024",
    description: "Property listing platform with virtual tours and map integration.",
    images: [
      "/assets/project5-1.jpg",
      "/assets/project5-2.jpg"
    ],
    techStack: ["Vue.js", "Nuxt", "Leaflet", "Laravel"],
    stats: { label: "Listings", value: "500+" }
  }
];

const OPTIONS: EmblaOptionsType = { loop: true, align: 'center' }

const Experience = () => {
  return (
    <section id="showcase" className="relative flex flex-col overflow-hidden -mt-20 pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center -z-20 bg-[url('/assets/background-kotak.png')]"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent -z-10" />

      <motion.div
        className="mx-auto backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/20 my-12 relative z-10"
      >
        <ShinyText
          text="My Experience"
          speed={5}
          className="text-2xl sm:text-3xl font-bold text-primary"
        />
      </motion.div>

      <EmblaCarousel projects={PROJECTS} options={OPTIONS} />
    </section>
  );
}

export default Experience