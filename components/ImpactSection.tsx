"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Mail } from "lucide-react";
import { NumberTicker } from "./NumberTicker";

const stats = [
    {
        numericValue: 4,
        suffix: "+",
        label: "Years of Experience",
        sublabel: "Software & Web Development",
        image: "/assets/stats/experience.webp",
        badge: "Since 2020"
    },
    {
        numericValue: 20,
        suffix: "+",
        label: "Projects Completed",
        sublabel: "SaaS, AI, EdTech & Web",
        image: "/assets/stats/projects.webp",
        badge: "Production Ready"
    },
    {
        numericValue: 6,
        suffix: "k+",
        label: "Active Users Impacted",
        sublabel: "Platform Learners & Clients",
        image: "/assets/stats/users.webp",
        badge: "Validated Impact"
    },
    {
        numericValue: 7,
        suffix: "+",
        label: "Domains Covered",
        sublabel: "AI, EdTech, SaaS, FinTech",
        image: "/assets/stats/domains.webp",
        badge: "Multi-Industry"
    }
];

const ImpactSection = () => {
    return (
        <div className="relative max-w-screen-lg mx-auto px-4 w-full">
            <div className="flex flex-col items-center justify-center space-y-10 md:space-y-12">
                {/* 4 Impact Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-7 border border-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
                        >
                            {/* Top: Image on the Left, Number & Badge on the Right */}
                            <div className="flex items-center gap-3.5 md:gap-4 mb-5">
                                <div className="p-2 bg-amber-50/50 rounded-2xl shrink-0 group-hover:bg-amber-100 transition-colors duration-500 shadow-xs">
                                    <Image
                                        src={stat.image}
                                        alt={stat.label}
                                        width={56}
                                        height={56}
                                        className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-amber-900/60 font-grotesk block truncate">
                                        {stat.badge}
                                    </span>
                                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-grotesk tracking-tight text-amber-950">
                                        <NumberTicker
                                            value={stat.numericValue}
                                            suffix={stat.suffix}
                                            delay={0.15 + idx * 0.1}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Title & Sublabel */}
                            <div className="space-y-1">
                                <div className="text-sm md:text-base font-bold text-slate-900 leading-snug font-grotesk">
                                    {stat.label}
                                </div>
                                <div className="text-xs md:text-sm text-slate-500 font-light leading-relaxed font-grotesk">
                                    {stat.sublabel}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Actions / CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full pt-2">
                    <a
                        href="https://github.com/glenrioariesto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-primary-variant to-primary text-white px-10 py-4.5 md:py-5 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 cursor-pointer"
                    >
                        <Github size={22} />
                        <span className="font-bold font-grotesk">Explore My Work</span>
                    </a>
                    <a
                        href="mailto:glenrioariesto@gmail.com"
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white border border-primary/20 px-10 py-4.5 md:py-5 rounded-2xl hover:bg-amber-50/50 transition-all shadow-lg shadow-amber-900/5 text-primary font-bold font-grotesk cursor-pointer"
                    >
                        <Mail size={22} />
                        Email Me
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ImpactSection;
