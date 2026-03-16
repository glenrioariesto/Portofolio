"use client";

import { motion } from "framer-motion";
import {
    Users,
    Server,
    Wrench,
    Zap,
    FileEdit,
    Github,
    Mail,
    ArrowRight
} from "lucide-react";
import { ShinyText } from "./ShinyText";

const services = [
    {
        title: "Project Consultation",
        description: "Expert guidance for your software project strategy, choosing the right tech stack, and architecting for scalability from day one.",
        icon: <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />,
    },
    {
        title: "Infrastructure & DevOps",
        description: "Cloud setup, CI/CD pipelines, and server management to ensure your application runs smoothly and scales effortlessly.",
        icon: <Server className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />,
    },
    {
        title: "Vibe Coding Rescue",
        description: "Turning AI-generated prototypes into production-ready software. I fix 'broken vibes', refactor code, and ensure stability.",
        icon: <Wrench className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />,
    },
    {
        title: "Performance & Optimization",
        description: "Tuning your application for maximum speed, SEO friendliness, and a 100/100 Lighthouse score.",
        icon: <Zap className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />,
    },
    {
        title: "PRD & Documentation Update",
        description: "Comprehensive technical requirements and PRD updates to align your development team with the business goals.",
        icon: <FileEdit className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const Services = () => {
    return (
        <section id="services" className="relative flex justify-center mx-auto max-w-screen-lg px-3 pt-8">
            <motion.div
                className="w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-[2.5rem] border border-white/30 p-8 md:p-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Header Section */}
                    <div className="md:w-1/3 text-center md:text-left space-y-6">
                        <ShinyText
                            text="My Services"
                            speed={5}
                            className="text-2xl sm:text-3xl font-rubik-doodle font-bold text-primary"
                        />
                        <p className="text-gray-500 leading-relaxed">
                            I provide professional consultation and technical services to help you build better digital products.
                        </p>

                        <div className="flex flex-col gap-3 pt-4">
                            <a
                                href="https://github.com/glenrioariesto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center md:justify-start gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-md"
                            >
                                <Github size={20} />
                                <span className="font-semibold">Visit My GitHub</span>
                            </a>
                            <a
                                href="mailto:glenrioariesto@gmail.com"
                                className="flex items-center justify-center md:justify-start gap-3 bg-gradient-to-r from-primary-variant to-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                            >
                                <Mail size={20} />
                                <span className="font-semibold">Email Me Directly</span>
                            </a>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 rounded-2xl bg-white/50 border border-white shadow-sm hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1 group"
                            >
                                <div className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl w-fit group-hover:from-secondary group-hover:to-cyan-400 transition-all duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-secondary-variant transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
