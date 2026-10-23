"use client";

import {
  FiX,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

      {/* Modal */}
      <div className="relative max-h-[82vh] w-full max-w-[500px] overflow-y-auto rounded-[22px] bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b border-slate-200 bg-[#F5F5FF] px-8 py-5">

          <button
            type="button"
            onClick={onClose}
            className="absolute right-7 top-7 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-slate-500 hover:scale-105 shadow-sm transition hover:text-violet-600"
          >
            <FiX className="text-[18px]" />
          </button>

          <div className="flex items-start gap-5">

            {/* Company Letter */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-[16px] font-bold text-white">
              {job.logoLetter}
            </div>

            <div>
              <h2 className="text-[17px] font-extrabold text-slate-950">
                {job.title}
              </h2>

              <p className="mt-1 text-[13px] font-medium text-slate-500">
                {job.company}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-medium text-slate-500">

                <span className="flex items-center gap-2">
                  <FiMapPin />
                  {job.location}
                </span>

                <span className="flex items-center gap-2">
                  <FiBriefcase />
                  {job.type}
                </span>

                <span className="flex items-center gap-2">
                  <FiDollarSign />
                  {job.salary}
                </span>

              </div>
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="space-y-7 px-8 py-8">

          {/* Skills */}
          <div>
            <h3 className="text-[13px] font-bold uppercase text-slate-400">
              Required Skills
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills?.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-[11px] font-semibold text-violet-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[13px] font-bold uppercase text-slate-400">
              Job Description
            </h3>

            <p className="mt-3 text-[14px] leading-5 text-slate-700">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-[13px] font-bold uppercase text-slate-400">
              Requirements
            </h3>

            <p className="mt-3 text-[14px] leading-5 text-slate-700">
              {job.requirements}
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-[16px] border border-slate-200 bg-[#F8FAFD] p-4">

            <h3 className="text-[13px] font-bold uppercase text-slate-400">
              Contact Information
            </h3>

            <div className="mt-4 space-y-3">

              <div className="flex items-center gap-3 text-blue-600">
                <FiMail className="text-[15px]" />

                <span className="text-[14px]">
                  {job.contactEmail}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <FiPhone className="text-[15px]" />

                <span className="text-[14px]">
                  {job.contactPhone}
                </span>
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              type="button"
              className="h-11 flex-1 rounded-xl bg-gradient-to-r from-blue-500 cursor-pointer to-violet-600 text-[15px] font-bold text-white  hover:scale-105 hover:shadow-sm transition-all ease-in-out"
            >
              Apply Now
            </button>

            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl bg-slate-100 px-7 text-[15px] font-bold cursor-pointer text-slate-600 hover:bg-slate-200"
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}