"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, FolderCheck, Users, Layers } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  badge?: string;
}

const statsData: StatItem[] = [
  {
    value: "4+",
    label: "Years of Experience",
    sublabel: "Software & Web Development",
    icon: <Briefcase className="w-5 h-5 text-amber-700" />,
    badge: "Since 2020"
  },
  {
    value: "20+",
    label: "Projects Completed",
    sublabel: "SaaS, AI Apps, EdTech & Web",
    icon: <FolderCheck className="w-5 h-5 text-amber-700" />,
    badge: "Production Ready"
  },
  {
    value: "6k+",
    label: "Active Users Impacted",
    sublabel: "Platform Learners & Clients",
    icon: <Users className="w-5 h-5 text-amber-700" />,
    badge: "Validated Impact"
  },
  {
    value: "7+",
    label: "Domains Covered",
    sublabel: "AI, EdTech, SaaS, FinTech, 3D",
    icon: <Layers className="w-5 h-5 text-amber-700" />,
    badge: "Multi-Industry"
  }
];

export const Stats: React.FC = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 -mt-4 mb-8 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative bg-white/80 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-white/60 shadow-[0_10px_30px_rgba(69,26,3,0.06)] hover:shadow-[0_15px_35px_rgba(69,26,3,0.1)] transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-colors" />

            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/80 flex items-center justify-center border border-amber-200/50 shadow-xs">
                {stat.icon}
              </div>
              {stat.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 bg-amber-100/50 px-2.5 py-1 rounded-full border border-amber-200/30">
                  {stat.badge}
                </span>
              )}
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-extrabold font-grotesk tracking-tight text-amber-950 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 leading-snug">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium leading-tight">
                {stat.sublabel}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
