"use client";

import { Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const orgExperiences = [
  {
    title: "SOFTWARE ENGINEERING STUDENT ASSOCIATION",
    company: "External Division Staff",
    duration: "2022 - 2023",
    description: [
      `I have experience in an external division organization that focuses on
      networking and providing platforms for Software Engineering students to
      donate. The donations collected are used to help those in need, including
      distributing funds to flood victims in Garut.`,
      `Collaborating with teams and external partners to expand networking opportunities and strengthen community outreach initiatives.`,
      `Implementing strategic initiatives to enhance fundraising efficiency and improve the donation distribution process.`
    ],
  },
  {
    title: `SOFTWARE ENGINEER QUALITY LEADERS`,
    company: `Secretary`,
    duration: `2022 - 2023`,
    description: [
      `I have experience as a secretary, managing incoming and outgoing files, as well as taking meeting minutes.`,
      `Optimized web performance and improved accessibility.`,
      `Built reusable React components for scalable applications.`
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const OrgExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative flex justify-center mx-auto max-w-screen-lg pt-12 ">
      <motion.div
        ref={ref}
        className="w-full flex flex-col md:flex-row items-start gap-10 p-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Sticky Section */}
        <motion.div
          className="md:w-1/3 md:sticky top-96 self-start text-center md:text-left px-4"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center md:justify-start gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Briefcase className="w-7 h-7 md:w-20 md:h-20 text-primary" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">My Organizational Experience</h2>
          </div>
          <p className="text-md sm:text-lg text-gray-500 leading-relaxed mt-2 text-justify">
            Here are some of the positions and contributions I have made within various organizations.
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="w-full md:w-2/3 space-y-6">
          <AnimatePresence>
            {orgExperiences.map((exp, index) => (
              <motion.div
                key={index}
                className="p-6 sm:p-8 rounded-lg shadow-lg bg-white"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                layout
              >
                <h3 className="text-2xl sm:text-xl font-bold text-secondary">{exp.title}</h3>
                <p className="text-sm text-secondary/80">{exp.company} • {exp.duration}</p>
                <ul className="list-disc pl-5 mt-2 text-gray-700 text-justify">
                  {exp.description.map((point, i) => (
                    <motion.li
                      key={i}
                      className="mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default OrgExperience;