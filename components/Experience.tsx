"use client";

import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Fullstack Developer",
    company: "AIGensee",
    duration: "08-2024 - Present",
    description: [
      "Developing web applications using Next.js, Tailwind CSS, TypeScript, and PostgreSQL.",
      "Collaborating with backend engineers to optimize API performance.",
      "Implementing CI/CD pipelines for automated deployment."
    ],
  },
  {
    title: "Frontend Developer",
    company: "Web Solutions",
    duration: "2022 - 2023",
    description: [
      "Worked on UI/UX improvements using Next.js, Tailwind CSS, and Framer Motion.",
      "Optimized web performance and improved accessibility.",
      "Built reusable React components for scalable applications."
    ],
  },
  {
    title: "AI Research Assistant",
    company: "AI Lab",
    duration: "2021 - 2022",
    description: [
      "Researching and implementing AI-driven applications for automation and analysis.",
      "Developing machine learning models for predictive analytics.",
      "Writing research papers and presenting findings in conferences."
    ],
  },
  {
    title: "AI Research Assistant",
    company: "AI Lab",
    duration: "2021 - 2022",
    description: [
      "Researching and implementing AI-driven applications for automation and analysis.",
      "Developing machine learning models for predictive analytics.",
      "Writing research papers and presenting findings in conferences."
    ],
  },
  {
    title: "AI Research Assistant",
    company: "AI Lab",
    duration: "2021 - 2022",
    description: [
      "Researching and implementing AI-driven applications for automation and analysis.",
      "Developing machine learning models for predictive analytics.",
      "Writing research papers and presenting findings in conferences."
    ],
  }, {
    title: "AI Research Assistant",
    company: "AI Lab",
    duration: "2021 - 2022",
    description: [
      "Researching and implementing AI-driven applications for automation and analysis.",
      "Developing machine learning models for predictive analytics.",
      "Writing research papers and presenting findings in conferences."
    ],
  },
 
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const section = document.getElementById("experience");
      if (!section) return;
  
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Bagi tinggi section secara lebih merata berdasarkan jumlah card
      const cardHeight = sectionHeight / (experiences.length + 1);
      
      // Hitung index yang sedang aktif berdasarkan posisi scroll
      const newIndex = Math.floor((scrollY - sectionTop) / cardHeight);
  
      // Pastikan index tetap dalam rentang yang benar
      setActiveIndex(Math.max(0, Math.min(newIndex, experiences.length - 1)));
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  return (
    <section id="experience" className="relative flex justify-center mx-auto max-w-screen-lg pt-28">
      <div className="w-full flex flex-col md:flex-row items-start gap-10">
        
        {/* Kolom 1: Sticky Section */}
        <div className="md:w-1/3  md:sticky top-36 self-start text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Briefcase className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">My Experience</h2>
          </div>
          <p className="text-md sm:text-lg text-gray-500 leading-relaxed mt-2">
            Here are some of the roles I’ve worked in over the years.
          </p>
        </div>

        {/* Kolom 2: Sticky Stacking Card List */}
        <div className="md:w-2/3 relative h-auto" style={{ height: `max(100vh, ${experiences.length * 100}vh)` }}>
         <div className="sticky top-36 h-screen flex flex-col justify-center">
            {experiences.map((exp, index) => {
            // Hitung posisi vertikal kartu berdasarkan activeIndex
            const isActive = index <= activeIndex;
            const yOffset = isActive ? index * 34 : activeIndex * 34 + (index - activeIndex) * 240;

            return (
            <div
                key={index}
                className="absolute top-0 left-0 w-full p-6 sm:p-8 border-l-4 border-primary bg-white rounded-lg shadow-lg transition-transform duration-500 ease-in-out"
                style={{
                transform: `translateY(${yOffset}px)`,
                }}
            >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{exp.title}</h3>
                <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>

                <ul className="list-disc pl-5 mt-2 text-gray-700">
                {exp.description.map((point, i) => (
                    <li key={i} className="mb-1">{point}</li>
                ))}
                </ul>
            </div>
            );
        })}
       
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
