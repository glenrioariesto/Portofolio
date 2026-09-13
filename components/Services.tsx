"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Github,
    Mail,
    ArrowUpRight,
    Briefcase,
    FolderCheck,
    Users,
    Layers
} from "lucide-react";
import { ShinyText } from "./ShinyText";

const stats = [
    {
        value: "4+",
        label: "Years of Experience",
        sublabel: "Software & Web Development",
        icon: <Briefcase className="w-5 h-5 text-amber-800" />,
        badge: "Since 2020"
    },
    {
        value: "20+",
        label: "Projects Completed",
        sublabel: "SaaS, AI, EdTech & Web",
        icon: <FolderCheck className="w-5 h-5 text-amber-800" />,
        badge: "Production Ready"
    },
    {
        value: "6k+",
        label: "Active Users Impacted",
        sublabel: "Platform Learners & Clients",
        icon: <Users className="w-5 h-5 text-amber-800" />,
        badge: "Validated Impact"
    },
    {
        value: "7+",
        label: "Domains Covered",
        sublabel: "AI, EdTech, SaaS, FinTech",
        icon: <Layers className="w-5 h-5 text-amber-800" />,
        badge: "Multi-Industry"
    }
];

const services = [
    {
        title: "Project Consultation",
        description: "Expert guidance for software strategy, tech stack selection, and scalable architecture design from day one.",
        icon: <Image src="/assets/services/consultation.webp" alt="Consultation" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-2 lg:col-span-2",
    },
    {
        title: "Infrastructure",
        description: "Seamless cloud setup and CI/CD pipelines.",
        icon: <Image src="/assets/services/infrastructure.webp" alt="Infrastructure" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
    {
        title: "Vibe Coding Rescue",
        description: "Fixing AI-generated prototypes. I refactor code, fix broken vibes, and ensure production-level stability.",
        icon: <Image src="/assets/services/rescue.webp" alt="Rescue" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
    {
        title: "Performance",
        description: "Maximum speed, SEO friendliness, and perfect Lighthouse scores.",
        icon: <Image src="/assets/services/performance.webp" alt="Performance" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
    {
        title: "PRD & Documentation",
        description: "Detailed technical requirements and alignment between business and development teams.",
        icon: <Image src="/assets/services/documentation.webp" alt="Documentation" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
];

const Services = () => {
    return (
        <section id="services" className="relative max-w-screen-lg mx-auto py-20 px-4">
            <div className="space-y-16">
                {/* Centered Header */}
                <div className="text-center space-y-6">
                    <h2 className="text-3xl md:text-7xl font-grotesk font-bold text-amber-900 tracking-tighter">
                        My Services
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-xl leading-relaxed font-grotesk font-light">
                        Professional consultation and technical excellence.
                        I help you build digital products that feel premium and perform beyond expectations.
                    </p>
                </div>

                {/* Bento Grid Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`
                                group relative p-8 rounded-[3rem] border border-white shadow-sm overflow-hidden
                                bg-white/70 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                                ${service.className}
                            `}
                        >
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-8 p-2 bg-amber-50/50 rounded-3xl w-fit group-hover:bg-amber-100 transition-colors duration-500">
                                    {service.icon}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-slate-900 font-grotesk">
                                            {service.title}
                                        </h3>
                                        <ArrowUpRight size={24} className="text-stone-300 group-hover:text-amber-700 transition-all duration-500" />
                                    </div>
                                    <p className="text-gray-500 leading-relaxed text-lg font-grotesk font-light">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Impact / Proven Track Record Metrics */}
                <div className="pt-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="relative bg-white/80 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-white/60 shadow-[0_10px_30px_rgba(69,26,3,0.06)] hover:shadow-[0_15px_35px_rgba(69,26,3,0.1)] transition-all flex flex-col justify-between overflow-hidden group"
                            >
                                <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-colors" />

                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-100/80 flex items-center justify-center border border-amber-200/50 shadow-xs">
                                        {stat.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 bg-amber-100/50 px-2.5 py-1 rounded-full border border-amber-200/30">
                                        {stat.badge}
                                    </span>
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

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                    <a
                        href="https://github.com/glenrioariesto"
                        target="_blank"
                        className="flex items-center gap-3 bg-gradient-to-r from-primary-variant to-primary text-white px-10 py-5 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20"
                    >
                        <Github size={24} />
                        <span className="font-bold">Explore My Work</span>
                    </a>
                    <a
                        href="mailto:glenrioariesto@gmail.com"
                        className="flex items-center gap-3 bg-white/50 backdrop-blur-md border border-primary/20 px-10 py-5 rounded-2xl hover:bg-white transition-all shadow-lg text-primary font-bold"
                    >
                        <Mail size={24} />
                        Email Me
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
