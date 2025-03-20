"use client";

import { Briefcase } from "lucide-react";

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

const OrgExperience = () => {
  return (
    <section id="org-experience" className="relative flex justify-center mx-auto max-w-screen-lg pt-12">
      <div className="w-full flex flex-col md:flex-row items-start gap-10">
        
        {/* Sticky Section */}
        <div className="md:w-1/3 md:sticky top-96 self-start text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Briefcase className="w-7 h-7 md:w-20 md:h-20 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">My Organizational Experience</h2>
          </div>
          <p className="text-md sm:text-lg text-gray-500 leading-relaxed mt-2 text-justify">
            Here are some of the positions and contributions I have made within various organizations.
          </p>
        </div>

        {/* Experience List */}
        <div className="w-full md:w-2/3 space-y-6">
          {orgExperiences.map((exp, index) => (
            <div
              key={index}
              className={`p-6 sm:p-8 rounded-lg shadow-lg hover:brightness-110 transition duration-600 ease-in-out`}
            >
              <h3 className="text-2xl sm:text-xl font-bold text-secondary">{exp.title}</h3>
              <p className="text-sm text-secondary/80">{exp.company} • {exp.duration}</p>
              <ul className="list-disc pl-5 mt-2 text-gray-700 text-justify">
                {exp.description.map((point, i) => (
                  <li key={i} className="mb-1">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgExperience;
