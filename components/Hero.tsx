"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MailCheckIcon } from "lucide-react";

const Hero = () => {
  return (
    <section className="flex justify-center items-center mx-auto max-w-screen-lg pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white shadow-lg rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center "
      >
        {/* Foto Profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3 flex justify-center"
        >
            <div className="w-[400px] h-[400px] rounded-full overflow-hidden ">
                <Image
                src="/profile.webp"
                alt="Glen Rio Aristo"
                width={200}
                height={200}
                quality={100}
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
          <h1 className="text-2xl font-bold text-primary flex items-center justify-center md:justify-start">
            <motion.span
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-block"
            >
              👋
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              Hello, I'm
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-pulse"></span>
            </motion.span>
          </h1>
       
          <h1 className="text-4xl font-bold text-primary">Glen Rio Aristo</h1>
          <p className="text-lg leading-relaxed text-gray-500">
            A <span className="bg-gradient-to-r from-secondary to-cyan-400 text-transparent bg-clip-text font-semibold">
              Fullstack Developer
            </span> and <span className="bg-gradient-to-r from-secondary-variant to-pink-400 text-transparent bg-clip-text font-semibold">
              AI enthusiast
            </span> with over 1 year of experience in building innovative digital solutions. 
            I specialize in developing <span className="bg-gradient-to-r from-primary-variant to-teal-400 text-transparent bg-clip-text font-semibold">
              web applications
            </span>, leveraging modern technologies and AI to enhance efficiency and quality.
          </p>
          <a 
            className="bg-gradient-to-r from-primary-variant to-primary px-4 py-2 w-full justify-center text-center rounded-md flex items-center gap-2" 
            href="mailto:glenrioariesto@gmail.com"
          >
            <MailCheckIcon className="w-5 h-5" /> 
            Email Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
