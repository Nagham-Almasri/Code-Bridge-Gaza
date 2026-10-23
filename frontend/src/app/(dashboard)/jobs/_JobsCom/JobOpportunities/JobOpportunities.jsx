"use client";

import { useState } from "react";

import JobCard from "../JobCard/JobCard";
import JobDetailsModal from "../JobDetailsModal/JobDetailsModal";

const jobs = [
  {
    logoLetter: "T",
    title: "Frontend Developer",
    company: "TechPalestine",
    location: "Gaza City",
    type: "Full-time",
    salary: "$800–1,200/mo",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    postedAt: "2 days ago",

    description:
      "Looking for a skilled React developer to join our growing team and build modern web applications for local and international clients.",

    requirements:
      "3+ years React experience, TypeScript, Tailwind CSS, REST APIs, Git proficiency.",

    contactEmail: "jobs@techpalestine.com",
    contactPhone: "+970 59 123 4567",
  },

  {
    logoLetter: "D",
    title: "UI/UX Designer",
    company: "DesignHub Gaza",
    location: "Remote",
    type: "Remote",
    salary: "$700–1,000/mo",
    skills: ["Figma", "Adobe XD", "UI Design"],
    postedAt: "1 week ago",

    description:
      "We are looking for a creative UI/UX designer to create modern and user-friendly digital experiences.",

    requirements:
      "Experience with Figma, wireframing, prototyping, user research, and responsive design.",

    contactEmail: "jobs@designhub.com",
    contactPhone: "+970 59 234 5678",
  },

  {
    logoLetter: "I",
    title: "React Developer",
    company: "Innovation Labs",
    location: "Khan Younis",
    type: "Part-time",
    salary: "$500–800/mo",
    skills: ["React", "JavaScript", "CSS"],
    postedAt: "3 days ago",

    description:
      "Join our frontend team and help us build responsive and modern React applications.",

    requirements:
      "Strong React and JavaScript knowledge, CSS skills, Git, and component-based development experience.",

    contactEmail: "jobs@innovationlabs.com",
    contactPhone: "+970 59 345 6789",
  },

  {
    logoLetter: "G",
    title: "Full Stack Developer",
    company: "Gaza Tech Solutions",
    location: "Gaza City",
    type: "Full-time",
    salary: "$1,000–1,500/mo",
    skills: ["Node.js", "React", "MongoDB"],
    postedAt: "5 days ago",

    description:
      "We are seeking a full stack developer to build and maintain modern web applications.",

    requirements:
      "Experience with React, Node.js, MongoDB, REST APIs, and Git.",

    contactEmail: "jobs@gazatech.com",
    contactPhone: "+970 59 456 7890",
  },

  {
    logoLetter: "C",
    title: "Graphic Designer",
    company: "Creative Studios",
    location: "Remote",
    type: "Freelance",
    salary: "$600–900/mo",
    skills: ["Illustrator", "Photoshop", "Branding"],
    postedAt: "1 day ago",

    description:
      "Create engaging visual content and branding materials for digital and social media projects.",

    requirements:
      "Strong skills in Adobe Illustrator, Photoshop, branding, and visual communication.",

    contactEmail: "jobs@creativestudios.com",
    contactPhone: "+970 59 567 8901",
  },

  {
    logoLetter: "D",
    title: "Web Developer",
    company: "Digital Agency Gaza",
    location: "Rafah",
    type: "Full-time",
    salary: "$750–1,100/mo",
    skills: ["HTML", "CSS", "JavaScript"],
    postedAt: "4 days ago",

    description:
      "Build responsive websites and web interfaces for different client projects.",

    requirements:
      "Strong HTML, CSS, JavaScript, responsive design, and Git skills.",

    contactEmail: "jobs@digitalagency.com",
    contactPhone: "+970 59 678 9012",
  },
];

export default function JobOpportunities() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <section>

      {/* Section Header */}
      <div className="mb-7">
        <h2 className="text-[20px] font-extrabold text-slate-950">
          Job Opportunities
        </h2>

        <p className="mt-1 text-[13px] font-medium text-slate-500">
          Explore available opportunities and find the right job for you.
        </p>
      </div>

      {/* Jobs List */}
      <div className="space-y-5">
        {jobs.map((job) => (
          <JobCard
            key={`${job.title}-${job.company}`}
            {...job}
            onViewDetails={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

    </section>
  );
}