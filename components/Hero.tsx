"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MailCheckIcon, Github, Linkedin, FileDown } from "lucide-react";
import { NameText } from "./NameText";
import { ShinyText } from "./ShinyText";
import { useState, useEffect } from "react";
import { useNavbar } from "@/hooks/useNavbar";
import CVModal from "./CVModal";

const Hero = () => {
  const [showCV, setShowCV] = useState(false);
  const { hide, show } = useNavbar("heroCV");

  useEffect(() => {
    if (showCV) hide();
    else show();
    return () => show();
  }, [showCV, hide, show]);

  return (
    <section id="hero" className="flex flex-col justify-center items-center mx-auto max-w-screen-lg gap-8 px-4">
      <CVModal isOpen={showCV} onClose={() => setShowCV(false)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-6 md:p-12 flex flex-col md:flex-row items-center relative border border-white/30"
      >
        {/* "Available For Remote Work" Badge */}
        <div className="absolute md:top-6 md:right-6 top-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 flex items-center space-x-2 bg-secondary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg z-20 border border-white/20 whitespace-nowrap">
          <span className="relative flex h-2 w-2 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-primary-variant"></span>
          </span>
          <ShinyText
            text="Available For Remote Work"
            speed={5}
            as="span"
            className="text-[10px] md:text-sm font-medium"
          />
        </div>

        <NameText classNameContainer="block md:hidden pt-10" className="mb-4" />

        {/* Foto Profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3 flex justify-center"
        >
          <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-t-[70px] rounded-b-[20px] overflow-hidden shadow-2xl border-4 border-white/50">
            <Image
              src="/assets/profile.webp"
              alt="Glen Rio Aristo"
              width={200}
              height={200}
              quality={100}
              priority
              className="object-cover w-full h-full object-top"
            />
          </div>
        </motion.div>

        {/* Teks */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-2/3 mt-6 md:mt-0 md:ml-10 space-y-4 text-center md:text-left"
        >
          <NameText classNameContainer="hidden md:block" />

          <p className="text-sm md:text-lg leading-relaxed text-gray-500 font-grotesk font-light">
            A <span className="bg-gradient-to-r from-secondary to-secondary-variant text-transparent bg-clip-text font-bold">
              Fullstack Developer
            </span> and <span className="bg-gradient-to-r from-secondary-variant to-primary text-transparent bg-clip-text font-bold">
              AI enthusiast
            </span> with over 1 year of experience in building innovative digital solutions.
            I specialize in developing <span className="bg-gradient-to-r from-primary-variant to-primary text-transparent bg-clip-text font-bold">
              web applications
            </span>, leveraging modern technologies and AI to enhance efficiency and quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="bg-gradient-to-r from-primary-variant to-primary px-6 py-3 flex-1 justify-center text-center rounded-xl flex items-center gap-2 text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
              href="mailto:glenrioariesto@gmail.com"
            >
              <MailCheckIcon className="w-5 h-5" />
              Email Me
            </a>
            <button
              onClick={() => setShowCV(true)}
              className="bg-white/50 backdrop-blur-md border border-white/50 px-6 py-3 flex-1 justify-center text-center rounded-xl flex items-center gap-2 text-gray-700 font-medium hover:bg-white transition-all shadow-sm"
            >
              <FileDown className="w-5 h-5" />
              Download CV
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <a
              href="https://github.com/glenrioariesto"
              target="_blank"
              className="p-3 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all duration-300"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/glenrioariesto" 
              target="_blank"
              className="p-3 bg-gray-100 hover:bg-[#0077B5] hover:text-white rounded-full transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
