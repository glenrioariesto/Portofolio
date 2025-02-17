"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

const TechMarquee = () => {
  return (
    <div className="relative overflow-hidden h-16 max-w-screen-lg mx-auto px-4">
      {/* Gradient Shadow (inframe & outframe) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Shadow di kiri */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-secondary to-transparent opacity-20 rounded-xl z-10"></div>
        {/* Shadow di kanan*/}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-secondary to-transparent opacity-20 rounded-xl z-10"></div>
      </div>

      {/* Marquee */}
      <motion.div
        className="flex w-max space-x-10 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
      >
        {[...techStack, ...techStack].map((tech, index) => (
          <div key={index} className="flex items-center px-6 space-x-2">
            <Image
              src={tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className="w-16 h-16"
            />
            <span className="text-gray-400 text-2xl font-semibold">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
