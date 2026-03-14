"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, User, Briefcase, Layers, Sparkles } from "lucide-react";
import { ShinyText } from "./ShinyText";

const Navbar = () => {
  return (
    <>


      {/* Navigation Sidebar / Bottom Bar */}
      <nav className="
        fixed z-40 bg-white/90 backdrop-blur-md shadow-2xl border border-white/20
        /* Mobile: Floating Bottom Dock (iPhone style) */
        bottom-8 left-1/2 -translate-x-1/2 w-auto h-auto rounded-full flex flex-row justify-between items-center px-8 py-4 gap-6
        /* Desktop: Floating Left Sidebar */
        md:top-1/2 md:-translate-y-1/2 md:left-8 md:bottom-auto md:translate-x-0 md:flex-col md:px-4 md:py-10 md:gap-10 md:rounded-full
      ">

        {/* Logo / Number Badge (Desktop Only) */}
        <div className="hidden md:flex w-10 h-10 bg-black text-white rounded-full items-center justify-center font-bold text-xl">
          G
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row md:flex-col gap-6 md:gap-8 text-gray-400 items-center">
          <Link href="#" className="hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full" title="Home">
            <Home size={24} />
          </Link>
          <Link href="#about" className="hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full" title="About Me">
            <User size={24} />
          </Link>
          <Link href="#experience" className="hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full" title="Experience">
            <Briefcase size={24} />
          </Link>
          <Link href="#showcase" className="hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full" title="Showcase">
            <Layers size={24} />
          </Link>
          <Link href="#services" className="hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-full" title="Services">
            <Sparkles size={24} />
          </Link>
        </div>

        {/* Bottom Avatar (Desktop Only) */}
        <div className="hidden md:block mt-auto">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="/assets/profile.webp" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;
