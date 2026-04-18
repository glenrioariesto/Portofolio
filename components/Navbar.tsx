"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Layers, Sparkles, PhoneCall } from "lucide-react";
import { useNavbarContext } from "@/context/NavbarContext";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const { isHidden } = useNavbarContext();

  useEffect(() => {
    const sections = ["hero", "services", "showcase", "booking"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) setActiveSection("hero");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { id: "hero", label: "Home", icon: <Home size={22} />, href: "#" },
    { id: "services", label: "Services", icon: <Sparkles size={22} />, href: "#services" },
    { id: "showcase", label: "Projects", icon: <Layers size={22} />, href: "#showcase" },
    { id: "booking", label: "Contact", icon: <PhoneCall size={22} />, href: "#booking" },
  ];

  return (
    <motion.nav 
      initial={{ y: 0, opacity: 1, zIndex: 50 }}
      animate={{ 
        y: isHidden ? 250 : 0,
        opacity: isHidden ? 0 : 1,
        zIndex: isHidden ? -100 : 50,
        pointerEvents: isHidden ? "none" : "auto",
        display: isHidden ? "none" : "flex", // Force absolute disappearance
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        display: { delay: isHidden ? 0.3 : 0 } // Delay 'none' until animation finishes
      }}
      className="
      fixed 
      bottom-10 left-1/2 -translate-x-1/2 
      lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-8 lg:translate-x-0
    ">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          flex items-center gap-1 p-2 bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]
          lg:flex-col lg:py-8 lg:px-3 lg:gap-5
        "
      >
        {/* Brand Logo (Desktop) */}
        <Link href="#" className="hidden lg:flex mb-4 w-10 h-10 overflow-hidden rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
          <Image
            src="/assets/logo.webp"
            alt="Logo"
            width={40}
            height={40}
            priority
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="flex flex-row lg:flex-col gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                className="relative p-4 flex items-center justify-center group transition-all"
                title={link.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-amber-950 rounded-[1.5rem] lg:rounded-2xl shadow-lg shadow-amber-900/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-amber-950"}`}>
                  {link.icon}
                </span>

                {/* Desktop Tooltip */}
                <div className="hidden lg:block absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                    {link.label}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 border-4 border-transparent border-r-slate-900" />
                </div>

                {/* Mobile Active Indicator Dot */}
                {isActive && (
                   <motion.div 
                    layoutId="nav-dot"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 lg:hidden w-1 h-1 bg-amber-950 rounded-full"
                   />
                )}
              </Link>
            );
          })}
        </div>

        {/* Profile Trigger (Desktop) */}
        <Link href="#booking" className="hidden lg:block mt-4 group">
          <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm group-hover:border-primary transition-all active:scale-95">
            <Image
              src="/assets/profile.webp"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
