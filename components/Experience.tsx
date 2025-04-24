"use client"

import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Experience = () => {
  return (
    <section id="showcase" className="relative flex flex-col overflow-hidden -mt-20 pt-20">
  <div
    className="absolute inset-0 bg-cover bg-center -z-20 bg-[url('/assets/background-kotak.png')]"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-transparent -z-10" />

  <motion.div
    className="mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/20 my-12 relative z-10"
  >
    <ShinyText
      text="My Experience"
      speed={5}
      className="text-2xl sm:text-3xl font-bold text-primary"
    />
  </motion.div>

  <EmblaCarousel slides={SLIDES} options={OPTIONS} />
</section>
  );
}

export default Experience