"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MailCheckIcon } from "lucide-react";
import { NameText } from "./NameText";
import { ShinyText } from "./ShinyText";

const Hero = () => {
  return (
    <section id="about" className="flex flex-col justify-center items-center mx-auto max-w-screen-lg pt-12 gap-8 px-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center relative border-2 border-gray-400 2xl:border-gray-100 -mb-5"
      >
        {/* "Available For Remote Work" Badge - Absolute Top Right */}
        <div className="absolute top-6 right-6 hidden md:flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-full shadow-lg z-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-variant"></span>
          </span>
          <ShinyText
            text="Available For Remote Work"
            speed={5}
            className="text-sm font-medium whitespace-nowrap"
          />
        </div>

        <NameText classNameContainer="block md:hidden" className="mb-4" />

        {/* Foto Profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3 flex justify-center"
        >
          <div className="w-[400px] h-[400px] rounded-full overflow-hidden ">
            <Image
              src="/assets/profile.webp"
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

          <NameText classNameContainer="hidden md:block" />

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
