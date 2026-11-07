"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        id: "consultation",
        title: "Project Consultation",
        description: "Expert guidance for software strategy, tech stack selection, and scalable architecture design from day one.",
        deliverables: ["Architecture Blueprint", "Database Schema", "Stack Strategy"],
        bookingPrompt: "Project Consultation: I need a technical architecture review / system blueprint for my upcoming product.",
        icon: <Image src="/assets/services/consultation.webp" alt="Consultation" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 object-contain" />,
        className: "md:col-span-2 lg:col-span-2",
    },
    {
        id: "infrastructure",
        title: "Infrastructure",
        description: "Seamless cloud setup, edge deployment, and automated CI/CD pipelines.",
        deliverables: ["CI/CD Pipeline", "Cloud & Workers"],
        bookingPrompt: "Cloud & Edge Infrastructure: Looking to set up scalable deployment, CI/CD pipelines, or background queue architecture.",
        icon: <Image src="/assets/services/infrastructure.webp" alt="Infrastructure" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
    {
        id: "rescue",
        title: "Vibe Coding Rescue",
        description: "Fixing AI-generated prototypes. I refactor code, fix broken vibes, and ensure production-level stability.",
        deliverables: ["Code Refactor", "Bug & Security Fix"],
        bookingPrompt: "Vibe Coding Rescue: We have an AI-generated / MVP codebase that needs refactoring, bug fixing, and production hardening.",
        icon: <Image src="/assets/services/rescue.webp" alt="Rescue" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
    {
        id: "performance",
        title: "Performance",
        description: "Maximum speed, SEO friendliness, query optimization, and high Lighthouse scores.",
        deliverables: ["Core Web Vitals", "Query Optimization"],
        bookingPrompt: "Performance Optimization: Need help optimizing web speed, database query latency, or cloud costs.",
        icon: <Image src="/assets/services/performance.webp" alt="Performance" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
    {
        id: "prd",
        title: "PRD & Documentation",
        description: "Detailed technical requirements and alignment between business and development teams.",
        deliverables: ["Technical PRD", "API Spec"],
        bookingPrompt: "PRD & Technical Documentation: Need comprehensive technical specifications and architecture alignment for our engineering team.",
        icon: <Image src="/assets/services/documentation.webp" alt="Documentation" width={64} height={64} className="w-14 h-14 md:w-16 md:h-16 object-contain" />,
        className: "md:col-span-1 lg:col-span-1",
    },
];

const Services = () => {
    const handleSelectService = (service: typeof services[number]) => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("selectBookingService", {
                    detail: {
                        id: service.id,
                        title: service.title,
                        prompt: service.bookingPrompt,
                    },
                })
            );
            const bookingEl = document.getElementById("booking");
            if (bookingEl) {
                bookingEl.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <div id="services" className="relative max-w-screen-lg mx-auto px-4">
            <div className="space-y-10 md:space-y-12">
                {/* Centered Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-6xl font-grotesk font-bold text-amber-900 tracking-tighter">
                        My Services
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-grotesk font-light">
                        Professional consultation and technical excellence.
                        I help you build digital products that feel premium and perform beyond expectations.
                    </p>
                </div>

                {/* Bento Grid Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => handleSelectService(service)}
                            className={`
                                group text-left relative p-6 md:p-7 rounded-[2.25rem] border border-white shadow-sm overflow-hidden
                                bg-white/70 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer
                                flex flex-col justify-between
                                ${service.className}
                            `}
                        >
                            <div className="relative z-10 w-full flex flex-col h-full justify-between gap-4">
                                <div>
                                    <div className="mb-4 p-2 bg-amber-50/50 rounded-2xl w-fit group-hover:bg-amber-100 transition-colors duration-500">
                                        {service.icon}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900 font-grotesk group-hover:text-amber-800 transition-colors leading-snug">
                                                {service.title}
                                            </h3>
                                            <ArrowUpRight size={20} className="text-stone-300 group-hover:text-amber-700 transition-all duration-500 shrink-0" />
                                        </div>
                                        <p className="text-gray-500 leading-relaxed text-xs md:text-sm font-grotesk font-light">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Compact Deliverables Pills */}
                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-amber-900/10">
                                    {service.deliverables.map((item) => (
                                        <span
                                            key={item}
                                            className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-amber-50/80 text-amber-900 border border-amber-200/60"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
