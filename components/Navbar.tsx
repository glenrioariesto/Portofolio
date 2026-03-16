"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, User, Briefcase, Layers, Sparkles } from "lucide-react";
import { ShinyText } from "./ShinyText";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["about", "experience", "showcase", "services"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Focus on the middle-upper part of the screen
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

    // Fallback for Top of page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("about");
      }
    };
    window.addEventListener("scroll", handleScroll);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const navLinks = [
    { id: "about", label: "Home", icon: <Home size={24} />, href: "#" },
    { id: "about", label: "About", icon: <User size={24} />, href: "#about" },
    { id: "experience", label: "Exp", icon: <Briefcase size={24} />, href: "#experience" },
    { id: "showcase", label: "Work", icon: <Layers size={24} />, href: "#showcase" },
    { id: "services", label: "Svc", icon: <Sparkles size={24} />, href: "#services" },
  ];

  return (
    <>
      <nav className="
        fixed z-40 bg-white/80 backdrop-blur-lg shadow-2xl border border-white/30
        bottom-8 left-1/2 -translate-x-1/2 w-auto h-auto rounded-full flex flex-row justify-between items-center px-6 py-3 gap-4
        md:top-1/2 md:-translate-y-1/2 md:left-8 md:bottom-auto md:translate-x-0 md:flex-col md:px-4 md:py-10 md:gap-10 md:rounded-full
      ">
        <div className="hidden md:flex w-10 h-10 bg-black text-white rounded-full items-center justify-center font-bold text-xl hover:scale-110 transition-transform cursor-pointer">
          G
        </div>

        <div className="flex flex-row md:flex-col gap-4 md:gap-8 items-center">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.id || (link.label === "Home" && activeSection === "");
            return (
              <Link
                key={idx}
                href={link.href}
                className={`
                  flex flex-col items-center transition-all duration-300 p-2 rounded-xl group relative
                  ${isActive ? "text-primary bg-primary/5" : "text-gray-400 hover:text-black hover:bg-gray-100/50"}
                `}
                title={link.label}
              >
                {link.icon}
                <span className={`text-[10px] md:hidden mt-0.5 font-semibold ${isActive ? "text-primary" : ""}`}>
                  {link.label}
                </span>

                {/* Active Indicator Dot (Desktop) */}
                <span className={`
                  hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-500
                  ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `} />
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block mt-auto group">
          <Link href="#about" className="w-10 h-10 block rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm group-hover:border-primary transition-colors">
            <Image
              src="/assets/profile.webp"
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
