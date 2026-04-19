"use client";

import React from "react";
import { cvData } from "@/data";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink, Printer } from "lucide-react";

const CVTemplate = () => {
  const { personalInfo, summary, skills, workExperience, education, projects, achievements } = cvData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-container-parent flex flex-col w-full h-full bg-[#f8f9fa] overflow-y-auto print:bg-white print:p-0 relative">
      {/* CV Content (A4 Paper Style) */}
      <div className="cv-container max-w-[210mm] mx-auto my-8 p-[12mm] md:p-[15mm] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] print:shadow-none print:my-0 print:mx-0 print:w-full text-slate-800 font-sans">
        
        {/* Header - Minimalist & Bold */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-slate-900 pb-5 mb-6 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-none uppercase">{personalInfo.name}</h1>
            <p className="text-xs md:text-sm font-bold text-amber-900 tracking-wide uppercase">{personalInfo.title}</p>
          </div>
          <div className="text-left md:text-right text-[10px] md:text-[11px] space-y-0.5 font-medium">
            <div className="flex md:justify-end items-center gap-2">
              <span>{personalInfo.phone}</span>
              <Phone size={10} className="text-slate-300" />
            </div>
            <div className="flex md:justify-end items-center gap-2">
              <span>{personalInfo.email}</span>
              <Mail size={10} className="text-slate-300" />
            </div>
            <div className="flex md:justify-end items-center gap-2">
              <span>{personalInfo.location}</span>
              <MapPin size={10} className="text-slate-300" />
            </div>
          </div>
        </header>

        {/* Links Row */}
        <div className="flex flex-wrap justify-start md:justify-center gap-x-4 md:gap-x-6 gap-y-2 mb-6 py-2 border-b border-slate-100 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <div className="flex items-center gap-1.5"><Linkedin size={10} /> {personalInfo.linkedin}</div>
          <div className="flex items-center gap-1.5"><Github size={10} /> {personalInfo.github}</div>
          <div className="flex items-center gap-1.5 text-slate-900"><Globe size={10} /> {personalInfo.portfolio}</div>
        </div>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Professional Summary</h2>
          <p className="text-[11px] md:text-[12.5px] leading-relaxed text-slate-600 text-justify">{summary}</p>
        </section>

        {/* Work Experience */}
        <section className="mb-6">
          <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-50 pb-1">Professional Experience</h2>
          <div className="space-y-5">
            {workExperience.map((work, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-1">
                  <h3 className="font-bold text-slate-900 text-[13px] md:text-[14px]">{work.role}</h3>
                  <span className="text-[9px] md:text-[10px] font-black text-slate-400 tabular-nums uppercase">{work.dates}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50/50 px-2 py-0.5 rounded border-l-2 border-amber-900/20">
                  <span className="text-[10px] md:text-[11px] font-bold text-amber-950 uppercase tracking-tight">{work.company}</span>
                  <span className="text-[9px] md:text-[10px] font-medium text-slate-400 italic">{work.location}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {work.achievements.map((ach, idx) => (
                    <li key={idx} className="text-[11px] md:text-[12px] text-slate-600 leading-tight pl-1">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills - Focused Columns */}
        <section className="mb-6">
          <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-50 pb-1">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-12">
            <div className="space-y-1.5">
              <h3 className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-tighter">Hard Skills</h3>
              <p className="text-[10.5px] md:text-[11.5px] text-slate-700 leading-tight font-medium">
                {skills.hardSkills.join(" • ")}
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-tighter">Tools & Environment</h3>
              <p className="text-[10.5px] md:text-[11.5px] text-slate-700 leading-tight font-medium">
                {skills.tools.join(" • ")}
              </p>
            </div>
          </div>
        </section>

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <section>
            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-50 pb-1">Education</h2>
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row justify-between items-start gap-1">
                <h3 className="font-bold text-[12px] md:text-[13px] text-slate-900">{education.degree}</h3>
                <span className="text-[8px] md:text-[9px] font-black text-slate-400 whitespace-nowrap">{education.dates}</span>
              </div>
              <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase">{education.school}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] md:text-[10px] font-black bg-amber-900 text-white px-1.5 py-0.5 rounded">GPA: {education.gpa}</span>
              </div>
              <p className="text-[9px] md:text-[10px] text-slate-400 italic mt-1 leading-snug">{education.details}</p>
            </div>
          </section>

          <section>
            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-50 pb-1">Key Projects</h2>
            <div className="grid grid-cols-1 gap-2">
              {projects.slice(0, 4).map((project, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-bold text-[10px] md:text-[11px] text-slate-800 flex items-center gap-1 tracking-tight">
                    • {project.name}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-slate-500 leading-tight ml-2">{project.description}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-50 pb-1">Achievements & Volunteering</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {achievements.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between gap-4 border-b border-slate-50/50 pb-1">
                  <div className="flex flex-col">
                    <span className="text-[11px] md:text-[12px] font-bold text-slate-800">{item.title}</span>
                    <span className="text-[9px] font-black uppercase text-amber-900/60 leading-none">{item.role}</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black text-slate-300 tabular-nums">{item.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      <style jsx global>{`
        @media print {
          /* Hide standard layout elements */
          nav, footer, .scroll-progress, button:not(.print-btn), .sr-only {
            display: none !important;
          }

          /* Reset all potential scroll containers */
          html, body, main, #__next, .flex-col, .overflow-y-auto {
            height: auto !important;
            overflow: visible !important;
            position: static !important;
          }

          /* Hide EVERYTHING in the body except the modal and our specific CV */
          body > *:not(dialog), dialog > *:not(.cv-container-parent) {
            display: none !important;
          }

          /* Ensure the CV container is the only thing rendered and flows naturally */
          .cv-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 15mm !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            position: relative !important;
            display: block !important;
            visibility: visible !important;
          }

          /* Force page breaks to be clean */
          section {
            page-break-inside: avoid;
            display: block !important;
          }

          /* Color adjustments */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        /* Standard page settings */
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default CVTemplate;
