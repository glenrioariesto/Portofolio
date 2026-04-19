"use client"

import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";
import EmblaCarousel from "./EmblaCarousel";
import MobileShowcase from "./MobileShowcase";
import { EmblaOptionsType } from "embla-carousel";
import { showcaseData } from "@/data";

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
          as="h2"
          className="text-3xl md:text-6xl font-grotesk font-bold text-amber-900 tracking-tight"
        />
      </motion.div>

      <div className="hidden lg:block">
        <EmblaCarousel projects={showcaseData as Project[]} options={OPTIONS} />
      </div>
      <MobileShowcase projects={showcaseData as Project[]} />
    </section>
  );
}

export default Experience
