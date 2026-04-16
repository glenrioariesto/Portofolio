"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Github,
    Mail,
    ArrowUpRight
} from "lucide-react";
import { ShinyText } from "./ShinyText";

const services = [
    {
        title: "Project Consultation",
        description: "Expert guidance for software strategy, tech stack selection, and scalable architecture design from day one.",
        icon: <Image src="/assets/services/consultation.webp" alt="Consultation" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-2",
    },
    {
        title: "Infrastructure",
        description: "Seamless cloud setup and CI/CD pipelines.",
        icon: <Image src="/assets/services/infrastructure.webp" alt="Infrastructure" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1",
    },
    {
        title: "Vibe Coding Rescue",
        description: "Fixing AI-generated prototypes. I refactor code, fix broken vibes, and ensure production-level stability.",
        icon: <Image src="/assets/services/rescue.webp" alt="Rescue" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1",
    },
    {
        title: "Performance",
        description: "Maximum speed, SEO friendliness, and perfect Lighthouse scores.",
        icon: <Image src="/assets/services/performance.webp" alt="Performance" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1",
    },
    {
        title: "PRD & Documentation",
        description: "Detailed technical requirements and alignment between business and development teams.",
        icon: <Image src="/assets/services/documentation.webp" alt="Documentation" width={80} height={80} className="w-20 h-20 object-contain" />,
        className: "md:col-span-1",
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
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-xl leading-relaxed">
                        Professional consultation and technical excellence.
                        I help you build digital products that feel premium and perform beyond expectations.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
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
