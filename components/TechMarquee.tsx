"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ShinyText } from "./ShinyText";

const techStack = [
  { name: "Next.js", icon: "/tech-stack/nextjs.svg" },
  { name: "React", icon: "/tech-stack/react.svg" },
  { name: "Tailwind", icon: "/tech-stack/tailwind.svg" },
  { name: "ShadCN", icon: "/tech-stack/shadcn.svg" },
  { name: "Supabase", icon: "/tech-stack/supabase.svg" },
  { name: "MySQL", icon: "/tech-stack/mysql.svg" },
  { name: "PostgreSQL", icon: "/tech-stack/postgress.svg" },
  { name: "Vercel", icon: "/tech-stack/vercel.svg" },
  { name: "GitHub", icon: "/tech-stack/github.svg" },
  { name: "ChatGPT", icon: "/tech-stack/chatgpt.svg" },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
  },
};


const TechMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="py-12 px-6 flex flex-col items-center gap-8">
      {/* <div className="backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/20 relative z-10 transition-all hover:scale-105">
        <ShinyText
          text="My Tech Stack"
          speed={5}
          className="text-xl sm:text-2xl font-rubik-doodle font-bold text-primary px-4"
        />
      </div> */}

      <div
        className="relative overflow-hidden h-24 max-w-screen-lg w-full mx-auto px-4 rounded-[2.5rem] shadow-2xl backdrop-blur-md border border-white/30"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Shadow (inframe & outframe) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white/90 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white/90 to-transparent"></div>
        </div>

        {/* Marquee */}
        <motion.div
          className="flex w-max space-x-10 items-center h-full"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {[...techStack, ...techStack].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex items-center px-6 space-x-2"
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              variants={itemVariants}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: index * 0.2,
                }}
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="w-16 h-16"
                />
              </motion.div>
              <span className="text-gray-400 text-2xl font-semibold">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
