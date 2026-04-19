"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavbarContext } from "@/context/NavbarContext";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const Footer = () => {
    const { isHidden } = useNavbarContext();
    const currentYear = new Date().getFullYear();

    if (isHidden) return null;

    return (
        <footer className="relative bg-white text-slate-900 pt-20 md:pt-32 pb-0 px-4 md:px-0 overflow-hidden snap-start">
            {/* Top Transition: Peach to White (Matching Services Section) */}
            <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-background-primary to-white pointer-events-none" />

            <div className="relative z-10 max-w-screen-lg mx-auto mb-6 md:mb-10 md:px-4">
                {/* Upper Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 mb-16 md:mb-24">
                    <div className="space-y-4 md:space-y-6 max-w-2xl">
                        <h2 className="text-4xl md:text-7xl font-bold font-grotesk tracking-tighter leading-none text-amber-950">
                            Lets design <br />
                            <span className="text-primary italic">incredible work</span> <br className="md:hidden" /> together.
                        </h2>
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8 w-full md:w-auto md:text-right">
                        <div className="space-y-3">
                            <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">Available for New Projects</p>
                            <div className="flex gap-3 md:gap-4 justify-start md:justify-end">
                                <a href="https://linkedin.com/in/glenrioariesto" target="_blank" className="p-3 bg-white border-2 border-slate-100 rounded-2xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm active:scale-95">
                                    <Linkedin className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                                </a>
                                <a href="https://github.com/glenrioariesto" target="_blank" className="p-3 bg-white border-2 border-slate-100 rounded-2xl hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm active:scale-95">
                                    <Github className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                                </a>
                                <a href="mailto:glenrioariesto@gmail.com" className="p-3 bg-white border-2 border-slate-100 rounded-2xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm active:scale-95">
                                    <Mail className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links & Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 pt-10 md:pt-12 border-t border-slate-200/60 mb-16 md:mb-20">
                    <div className="flex flex-wrap gap-x-6 gap-y-4 text-[11px] md:text-sm font-bold uppercase tracking-wide text-slate-600">
                        <a href="#about" className="hover:text-primary transition-colors">Home</a>
                        <a href="#services" className="hover:text-primary transition-colors">Services</a>
                        <a href="#showcase" className="hover:text-primary transition-colors">Experience</a>
                        <a href="#booking" className="hover:text-primary transition-colors">Contact</a>
                    </div>

                    <div className="space-y-2 md:space-y-4 w-full md:w-auto text-left md:text-right">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Get in touch</p>
                        <a href="mailto:glenrioariesto@gmail.com" className="text-lg md:text-2xl font-black text-amber-950 hover:text-primary transition-colors underline underline-offset-8 decoration-primary/30 break-all md:break-normal">
                            glenrioariesto@gmail.com
                        </a>
                    </div>
                </div>

                {/* Credit Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-primary" />
                        Based in Bandung, Indonesia
                    </div>
                    <div>© {currentYear} Glen Rio Aristo — All Rights Reserved</div>
                </div>
            </div>

            {/* Big Branding at the absolute bottom */}
            <div className="relative mt-20 md:mt-auto w-full translate-y-[10%] md:translate-y-[15%]">
                <h1 className="text-[20vw] md:text-[18vw] font-black font-grotesk tracking-tighter leading-[0.7] text-primary/5 select-none text-center md:text-left pointer-events-none">
                    GlenRioAristo
                </h1>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-full" />
            </div>
        </footer>
    );
};

export default Footer;
