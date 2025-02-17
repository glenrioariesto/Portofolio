"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icon untuk hamburger menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-grotesk fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-screen-lg py-3 px-6 bg-white rounded-xl shadow-lg z-50">
      <div className="flex justify-between items-center">
        
        {/* "Available For Remote Work" */}
        <div className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-full">
          {/* Pin Circle dengan Animasi Kedip */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-variant"></span>
          </span>
          <h1 className="text-sm font-medium whitespace-nowrap">Available For Remote Work</h1>
        </div>

        {/* Menu untuk Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-secondary focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Link Navigasi */}
        <div className={`md:fle  ${isOpen ? "flex flex-col absolute top-14 right-0 bg-white shadow-md w-48 p-4 rounded-lg " : "hidden md:flex space-x-2"}`}>
          <Link href="#about" className="block text-secondary hover:text-primary py-1">About Me</Link>
          <Link href="#experience" className="block text-secondary hover:text-primary py-1">Experience</Link>
          <Link href="#showcase" className="block text-secondary hover:text-primary py-1">Showcase</Link>
          <Link href="#services" className="block text-secondary hover:text-primary py-1">Services</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
