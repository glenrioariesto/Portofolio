"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LayoutGrid,
  GalleryHorizontalEnd,
  ArrowUpRight,
} from "lucide-react";
import EmblaCarousel from "./EmblaCarousel";
import MobileShowcase from "./MobileShowcase";
import { EmblaOptionsType } from "embla-carousel";
import { showcaseData } from "@/data";
import { useNavbarContext } from "@/context/NavbarContext";

export interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
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

const OPTIONS: EmblaOptionsType = {
  loop: false,
  align: "center",
  containScroll: false,
};

const CAREER_TIMELINE = [
  {
    id: "workforce-piknix",
    company: "PT Workforce Nusantara Indonesia",
    role: "Fullstack Developer",
    period: "Sep 2026 - Present",
    type: "Enterprise & Mobile Ecosystem",
    location: "Indonesia (Remote / Hybrid)",
    summary:
      "Lead architecture and full-stack development for the Piknix multi-app ecosystem, orchestrating high-concurrency order routing, geospatial delivery zones, and real-time job queues.",
    highlights: [
      "Architected a unified NestJS monorepo backend serving 3 mobile applications (Customer, Merchant, Driver) and an administrative command center.",
      "Implemented Google Maps polygon routing, BullMQ & Redis asynchronous job queues, and multi-method payment state machines.",
      "Enforced strict RBAC data isolation and zero-downtime deployment workflows.",
    ],
    techStack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis & BullMQ",
      "React Native",
      "Google Maps API",
      "Docker",
    ],
    metrics: [
      { label: "Apps Powered", value: "3 Mobile + Web" },
      { label: "Architecture", value: "Monorepo + Queue" },
    ],
  },
  {
    id: "aigensee",
    company: "PT Gampang Cari Cuan | Aigensee",
    role: "Fullstack Web Developer",
    period: "Aug 2024 - Aug 2026",
    type: "AI SaaS & EdTech Platform",
    location: "Bandung, Indonesia",
    summary:
      "Engineered and scaled an AI-art SaaS learning & generation ecosystem to 6,000+ users, alongside internal enterprise operations and 6 national educational simulation games.",
    highlights: [
      "Built the flagship AI SaaS course & creator platform integrating Midtrans payment webhooks, automated Watzap WhatsApp notifications, and JWT session security.",
      "Developed internal HR attendance (99.9% accuracy) and student operations dashboards using Next.js, Drizzle ORM, and PostgreSQL.",
      "Delivered 6 interactive HTML5 Canvas & Matter.js educational simulation modules for Kemendikbud junior high school curricula.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle & Prisma",
      "Midtrans Gateway",
      "Watzap API",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Active Users", value: "6,000+" },
      { label: "Launch Milestone", value: "IDR 100M+ Rev" },
      { label: "Repeat Orders", value: "2,500+" },
    ],
  },
  {
    id: "election-sentiment-ai",
    company: "Academic & National Research Grant",
    role: "Data & NLP Pipeline Contributor",
    period: "May 2024 - Jun 2024",
    type: "AI & Large-Scale Data Pipeline",
    location: "Indonesia",
    summary:
      "Built automated data ingestion, cleaning, and sentiment classification pipelines for the 2024 Indonesian Presidential Election discourse analysis.",
    highlights: [
      "Scraped, deduplicated, and normalized 100,000+ social media records for large-scale sentiment modeling.",
      "Structured reproducible Python & Colab data pipelines for academic publication.",
    ],
    techStack: ["Python", "NLP Sentiment Analysis", "Data Scraping", "Google Colab", "Pandas"],
    metrics: [{ label: "Dataset Scale", value: "100,000+ Tweets" }],
  },
  {
    id: "bebras-indonesia",
    company: "Bebras Indonesia (National Computational Thinking)",
    role: "Field Data Systems & Research",
    period: "Jul 2022 - Aug 2022",
    type: "National Education Data Initiative",
    location: "10 Provinces, Indonesia",
    summary:
      "Executed systematic multi-province field data collection and validation for computational thinking curricula across Indonesian vocational high schools (SMK).",
    highlights: [
      "Coordinated structured survey instruments and data verification across 10 Indonesian provinces.",
      "Contributed empirical baseline data for national computational thinking adoption.",
    ],
    techStack: ["Data Validation", "Survey Systems", "Statistical Reporting"],
    metrics: [{ label: "Coverage", value: "10 Provinces" }],
  },
];

const CATEGORY_FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "saas", label: "AI & SaaS" },
  { id: "enterprise", label: "Enterprise & Portals" },
  { id: "edtech", label: "EdTech & Interactive" },
];

function matchCategory(project: Project, filterId: string): boolean {
  if (filterId === "all") return true;
  const cat = project.category.toLowerCase();
  const title = project.title.toLowerCase();
  if (filterId === "saas") {
    return cat.includes("saas") || title.includes("ai") || title.includes("ads");
  }
  if (filterId === "enterprise") {
    return (
      cat.includes("enterprise") ||
      cat.includes("workforce") ||
      cat.includes("visitor") ||
      title.includes("portal")
    );
  }
  if (filterId === "edtech") {
    return (
      cat.includes("edtech") ||
      cat.includes("interactive") ||
      cat.includes("extension") ||
      title.includes("simulasi") ||
      title.includes("kenangan") ||
      title.includes("academic") ||
      title.includes("swarm")
    );
  }
  return true;
}

const Experience = () => {
  const { isHidden } = useNavbarContext();
  const [activeTab, setActiveTab] = useState<"projects" | "career">("projects");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [desktopViewMode, setDesktopViewMode] = useState<"carousel" | "grid">("carousel");

  const allProjects = showcaseData as Project[];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => matchCategory(p, selectedFilter));
  }, [allProjects, selectedFilter]);

  return (
    <section id="showcase" className="relative flex flex-col overflow-hidden">
      {/* Top Section Header & Controls */}
      <motion.div
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-screen-lg w-full mx-auto px-4 mb-10 relative z-10 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6CDB2] pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-6xl font-grotesk font-bold text-amber-900 tracking-tight leading-none">
              My Experience
            </h2>
          </div>

          {/* Primary Mode Switcher: Case Studies vs Career Track Record */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/80 border border-amber-900/10 shadow-sm self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2.5 rounded-xl font-grotesk text-xs font-bold transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-primary-variant to-primary text-white shadow-md shadow-primary/20"
                  : "text-amber-950/70 hover:text-primary"
              }`}
            >
              Case Studies ({allProjects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("career")}
              className={`px-4 py-2.5 rounded-xl font-grotesk text-xs font-bold transition-all cursor-pointer ${
                activeTab === "career"
                  ? "bg-gradient-to-r from-primary-variant to-primary text-white shadow-md shadow-primary/20"
                  : "text-amber-950/70 hover:text-primary"
              }`}
            >
              Career Timeline ({CAREER_TIMELINE.length})
            </button>
          </div>
        </div>

        {/* Sub-Toolbar for Case Studies: Category Filter Pills + Desktop Carousel/Grid Toggle */}
        {activeTab === "projects" && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORY_FILTERS.map((filter) => {
                const isActive = selectedFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-3.5 py-2 rounded-xl font-grotesk text-xs font-semibold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-gradient-to-r from-primary-variant to-primary text-white border-primary shadow-sm"
                        : "bg-white/80 text-amber-950/70 border-amber-900/15 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop View Mode Toggle (Solves Carousel Scroll Lock) */}
            <div className="hidden lg:inline-flex items-center gap-1 p-1 rounded-xl bg-white/80 border border-amber-900/15">
              <button
                type="button"
                onClick={() => setDesktopViewMode("carousel")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-grotesk text-xs font-semibold transition-all cursor-pointer ${
                  desktopViewMode === "carousel"
                    ? "bg-gradient-to-r from-primary-variant to-primary text-white shadow-sm"
                    : "text-amber-950/70 hover:text-primary"
                }`}
              >
                <GalleryHorizontalEnd size={14} />
                <span>Interactive Slide</span>
              </button>
              <button
                type="button"
                onClick={() => setDesktopViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-grotesk text-xs font-semibold transition-all cursor-pointer ${
                  desktopViewMode === "grid"
                    ? "bg-gradient-to-r from-primary-variant to-primary text-white shadow-sm"
                    : "text-amber-950/70 hover:text-primary"
                }`}
              >
                <LayoutGrid size={14} />
                <span>Blueprint Grid</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === "projects" ? (
          <motion.div
            key={`projects-${selectedFilter}-${desktopViewMode}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {desktopViewMode === "carousel" ? (
              <div className="hidden lg:block">
                <EmblaCarousel projects={filteredProjects} options={OPTIONS} />
              </div>
            ) : (
              /* Desktop Blueprint Grid View */
              <div className="hidden lg:grid max-w-screen-lg mx-auto px-4 grid-cols-3 gap-5 pb-8">
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="group bg-white/85 backdrop-blur-xl border border-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video bg-[#fdf6f0] border-b border-amber-900/10 overflow-hidden">
                        {project.images.length > 0 && (
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary text-white font-tabular">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/95 text-amber-950 border border-amber-900/10">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-lg font-rubik-doodle font-bold text-slate-900 tracking-wide truncate">
                              {project.title}
                            </h3>
                            <p className="font-mono text-[11px] font-semibold text-primary truncate">
                              {project.role} • {project.date}
                            </p>
                          </div>
                          {project.links && project.links.length > 0 && (
                            <a
                              href={project.links[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-white font-mono text-[10px] font-semibold hover:bg-primary-variant transition-colors shrink-0"
                            >
                              <span>{project.links[0].label || "Live"}</span>
                              <ArrowUpRight size={12} />
                            </a>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2.5 border-t border-amber-900/10 space-y-2">
                      {project.stats && project.stats.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.stats.map((st, sIdx) => (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/60 text-slate-800"
                            >
                              <span className="text-gray-500">{st.label}:</span>
                              <strong className="text-primary font-tabular">{st.value}</strong>
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Showcase View (Filtered) */}
            <MobileShowcase projects={filteredProjects} />
          </motion.div>
        ) : (
          /* Inline Career Track Record Timeline */
          <motion.div
            key="career-timeline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-screen-lg w-full mx-auto px-4 pb-8"
          >
            <div className="relative border-l-2 border-primary/40 ml-3 md:ml-6 pl-5 md:pl-8 space-y-5">
              {CAREER_TIMELINE.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-white/85 backdrop-blur-xl border border-white rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-xl transition-all"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[29px] md:-left-[41px] top-6 w-3.5 h-3.5 rounded-full bg-primary border-4 border-[#FBE9D4]" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-amber-900/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-900 text-white">
                          {item.type}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-primary">
                          {item.period}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-grotesk font-bold text-slate-900 tracking-tight">
                        {item.role} — <span className="text-primary">{item.company}</span>
                      </h3>
                    </div>

                    {/* Key Quantified Metrics */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="px-2.5 py-1 rounded-xl bg-amber-50/80 border border-amber-200/60 font-mono text-[11px]"
                        >
                          <span className="text-gray-500 block text-[9px] uppercase">
                            {m.label}
                          </span>
                          <strong className="text-slate-900 font-tabular">{m.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-700 font-sans mt-3 leading-relaxed">
                    {item.summary}
                  </p>

                  <ul className="mt-2.5 space-y-1.5 list-disc list-inside">
                    {item.highlights.map((hl, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-xs text-gray-500 font-sans leading-relaxed"
                      >
                        {hl}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 pt-3 border-t border-amber-900/10 flex flex-wrap items-center gap-1.5">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-50/60 text-slate-800 border border-amber-200/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
