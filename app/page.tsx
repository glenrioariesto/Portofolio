"use client"

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, MousePointer2 } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Booking from "@/components/Booking";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Booking specific parallax transform
  const xBooking = useTransform(scrollYProgress, [0.6, 1], [150, -50]);

  // Entrance animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="flex flex-col text-slate-900">

      {/* 1. Hero Section - Snap Start (Already has animations inside component) */}
      <section className="relative shrink-0 min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat snap-start overflow-hidden"
        style={{ backgroundImage: "url('/assets/background-kotak.webp')" }}>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none" />
        <div className="w-full z-10 py-12">
          <Hero />
        </div>
      </section>

      {/* 2. Tech Stack Bridge - Waving Icons */}
      <section className="relative shrink-0 py-8 bg-background-primary snap-start flex flex-col justify-center overflow-visible">

        {/* Top Right Waving Asset (Tablet/Desktop) */}
        <motion.div

          animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="hidden md:block absolute -top-24 lg:-top-16 2xl:-top-40 right-6 lg:right-12 select-none pointer-events-none z-20"
        >
          <Image
            src="/assets/top_right_iso_icon.webp"
            alt="3D Isometric Tech Icon"
            width={190}
            height={190}
            className="w-20 h-20 lg:w-[90px] lg:h-[90px] 2xl:w-[190px] 2xl:h-[190px] opacity-100 drop-shadow-2xl object-contain"
          />
        </motion.div>

        {/* Bottom Left Waving Icon (Tablet/Desktop) */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="hidden md:block absolute -bottom-24 lg:-bottom-40 left-6 lg:left-12 select-none pointer-events-none z-20"
        >
          <Image
            src="/assets/bottom_left_iso_icon.webp"
            alt="3D Isometric Cursor Icon"
            width={180}
            height={180}
            className="w-20 h-20 lg:w-[100px] lg:h-[100px] 2xl:w-[180px] 2xl:h-[180px] opacity-100 drop-shadow-2xl object-contain"
          />
        </motion.div>

        <div className="relative z-10">
          <TechMarquee />
        </div>
      </section>

      {/* 3. Services Section - Reveal Animation */}
      <section className="relative shrink-0 min-h-screen flex items-center justify-center bg-white snap-start overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background-primary to-transparent pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="w-full z-10 py-12"
        >
          <Services />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none" />
      </section>

      {/* 4. Experience / Projects Showcase - Reveal Animation */}
      <section className="relative shrink-0 min-h-screen flex items-center justify-center bg-background-primary/30 snap-start overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="w-full z-10 md:px-16 2xl:px-0 py-12"
        >
          <Experience />
        </motion.div>
      </section>

      {/* 5. Booking Section - Reveal Animation */}
      <section className="relative shrink-0 min-h-screen flex items-center justify-center bg-background-primary/30 snap-start overflow-hidden">
        {/* Parallax Background Text (Desktop Only) */}
        <motion.div
          style={{ x: xBooking }}
          className="hidden md:block absolute top-0 lg:-top-20 left-20 text-[130px] lg:text-[10vw] font-black text-amber-900/5 whitespace-nowrap select-none pointer-events-none uppercase tracking-tighter z-0"
        >
          Let's Design Incredible Work
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="w-full z-10 md:px-16 py-12 lg:mt-20"
        >
          <Booking />
        </motion.div>
      </section>

    </main>
  );
}
