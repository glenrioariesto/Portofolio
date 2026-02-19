"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp, Layers, Calendar, Briefcase, ExternalLink, X } from 'lucide-react'
import Image from 'next/image'
import { Project } from './Experience'

// ────────────────────────────────────────────────────────────────
// Mobile Project Card
// ────────────────────────────────────────────────────────────────
const MobileProjectCard = ({
    project,
    index,
    isActive,
    onExpand,
}: {
    project: Project
    index: number
    isActive: boolean
    onExpand: () => void
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showTechStack, setShowTechStack] = useState(false)

    const nextImage = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation()
        if (project.images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
        >
            <div
                className="relative rounded-3xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100"
                onClick={onExpand}
            >
                {/* ── Image Section ── */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                    {project.images.length > 0 ? (
                        <>
                            <Image
                                src={project.images[currentImageIndex]}
                                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                fill
                                className="object-cover transition-all duration-700 ease-out"
                            />
                            {/* Gradient overlay on image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            {/* Image dots indicator */}
                            {project.images.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {project.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrentImageIndex(idx)
                                            }}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                                ? 'w-6 bg-white'
                                                : 'w-1.5 bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Tap to change image */}
                            {project.images.length > 1 && (
                                <button
                                    onClick={nextImage}
                                    className="absolute inset-0 z-[5]"
                                    aria-label="Next image"
                                />
                            )}
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center">
                            <div className="text-center">
                                <Briefcase size={48} className="mx-auto text-orange-300 mb-2" />
                                <p className="text-orange-400 text-sm font-medium">Private Project</p>
                            </div>
                        </div>
                    )}

                    {/* Project number badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <div className="w-9 h-9 bg-black/70 backdrop-blur-md text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                    </div>

                    {/* Link badges at top right */}
                    {project.links && project.links.length > 0 && (
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            {project.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 hover:bg-white transition-colors shadow-sm"
                                >
                                    {link.label}
                                    <ArrowUpRight size={12} />
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Category pill over image */}
                    <div className="absolute bottom-3 left-4 z-10">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* ── Content Section ── */}
                <div className="p-5 pt-4">
                    {/* Title & Date Row */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-lg font-rubik-doodle font-bold text-gray-900 leading-tight flex-1">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
                            <Calendar size={13} />
                            {project.date.includes(' - ') ? (
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-medium leading-tight">{project.date.split(' - ')[0]}</span>
                                    <span className="text-[10px] font-medium leading-tight">{project.date.split(' - ')[1]}</span>
                                </div>
                            ) : (
                                <span className="text-xs font-medium">{project.date}</span>
                            )}
                        </div>
                    </div>

                    {/* Role Badge */}
                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-xs font-semibold text-black">{project.role}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{project.description}</p>

                    {/* Stats pills */}
                    {project.stats && project.stats.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.stats.map((stat, idx) => (
                                <div key={idx} className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-full border border-orange-100">
                                    <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                                    <span className="text-sm font-bold bg-gradient-to-r from-primary-variant to-primary text-transparent bg-clip-text">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tech Stack */}
                    <div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowTechStack(!showTechStack)
                            }}
                            className="flex items-center gap-1.5 text-gray-400 mb-2"
                        >
                            <Layers size={13} />
                            <span className="text-xs font-semibold uppercase tracking-wider">Tech Stack</span>
                            <motion.div
                                animate={{ rotate: showTechStack ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown size={13} />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {showTechStack ? (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-wrap gap-1.5 pb-1">
                                        {project.techStack.map((tech, idx) => (
                                            <motion.span
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.03 }}
                                                className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.slice(0, 3).map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-400">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ────────────────────────────────────────────────────────────────
// Expanded Card Modal for Mobile
// ────────────────────────────────────────────────────────────────
const ExpandedProjectModal = ({
    project,
    index,
    onClose,
}: {
    project: Project
    index: number
    onClose: () => void
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const y = useMotionValue(0)
    const opacity = useTransform(y, [0, 300], [1, 0])

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose()
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Modal Sheet */}
            <motion.div
                className="relative z-10 w-full bg-white rounded-t-[2rem] overflow-hidden max-h-[92vh] shadow-[0_-20px_60px_rgba(0,0,0,0.2)]"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                style={{ y, opacity }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
            >
                {/* Drag Handle */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                    <X size={16} className="text-gray-500" />
                </button>

                <div className="overflow-y-auto max-h-[85vh] pb-8">
                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] mx-auto px-4">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            {project.images.length > 0 ? (
                                <>
                                    <Image
                                        src={project.images[currentImageIndex]}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                    {/* Image Slider */}
                                    {project.images.length > 1 && (
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                            {project.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                                        ? 'w-8 bg-white'
                                                        : 'w-2 bg-white/50'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 flex items-center justify-center rounded-2xl">
                                    <Briefcase size={60} className="text-orange-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pt-5">
                        {/* Number + Category */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="px-3 py-1 bg-orange-50 text-primary-variant text-xs font-semibold rounded-full border border-orange-100">
                                {project.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-rubik-doodle font-bold text-gray-900 mb-1 leading-tight">
                            {project.title}
                        </h2>

                        {/* Role */}
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase size={14} className="text-gray-400" />
                            <span className="text-sm font-semibold text-primary-variant">{project.role}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-gray-400 mb-3">
                            <Calendar size={13} />
                            <span className="text-xs font-medium">{project.date}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{project.description}</p>

                        {/* Stats */}
                        {project.stats && project.stats.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-4">
                                {project.stats.map((stat, idx) => (
                                    <div key={idx} className="flex-1 min-w-[120px] p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
                                        <span className="text-xs text-gray-500 font-medium block">{stat.label}</span>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-variant to-primary text-transparent bg-clip-text">
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tech Stack Full */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-gray-400 mb-3">
                                <Layers size={14} />
                                <span className="text-xs font-semibold uppercase tracking-wider">Tech Stack</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, idx) => (
                                    <motion.span
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.04 }}
                                        className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-700"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {project.links && project.links.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {project.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-variant to-primary text-white rounded-2xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ExternalLink size={18} />
                                            <span className="text-sm font-semibold">{link.label}</span>
                                        </div>
                                        <ArrowUpRight size={18} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

// ────────────────────────────────────────────────────────────────
// Main Mobile Showcase Component
// ────────────────────────────────────────────────────────────────
const MobileShowcase = ({ projects }: { projects: Project[] }) => {
    const [expandedProject, setExpandedProject] = useState<number | null>(null)

    // Lock body scroll when modal is open
    useEffect(() => {
        if (expandedProject !== null) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [expandedProject])

    return (
        <div className="block md:hidden px-4 pb-6">
            {/* Cards container */}
            <div className="flex flex-col gap-5">
                {projects.map((project, index) => (
                    <MobileProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        isActive={expandedProject === index}
                        onExpand={() => setExpandedProject(index)}
                    />
                ))}
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {expandedProject !== null && (
                    <ExpandedProjectModal
                        project={projects[expandedProject]}
                        index={expandedProject}
                        onClose={() => setExpandedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default MobileShowcase
