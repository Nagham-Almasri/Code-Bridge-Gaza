"use client";

import { useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiTarget,
} from "react-icons/fi";

export default function CareerInputs() {
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    router.push("/signup/skills");
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Major / Job Title
        </label>

        <div className="relative">
          <select
            defaultValue=""
            className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-12 text-sm font-semibold text-slate-700 outline-none"
          >
            <option value="" disabled>
              Select your field
            </option>
            <option value="frontend">Front-End Developer</option>
            <option value="backend">Back-End Developer</option>
            <option value="fullstack">Full-Stack Developer</option>
            <option value="uiux">UI/UX Designer</option>
            <option value="mobileapp">Mobile App Developer</option>
            <option value="dataanalyst">Data Analyst</option>
            <option value="aiml">AI/Machine Learning Engineer</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="softwareengineer">Software Engineer</option>
            <option value="other">Other</option>

          </select>

          <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Experience Level
        </label>

        <div className="relative">
          <select
            defaultValue=""
            className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-12 text-sm font-semibold text-slate-700 outline-none"
          >
            <option value="" disabled>
              Select your level
            </option>
            <option value="student">Student</option>
            <option value="fresh">Fresh Graduate</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid Level</option>
          </select>

          <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={() => router.push("/signup/personal")}
          className="flex h-14 w-[105px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-500"
        >
          <FiChevronLeft />
          Back
        </button>

        <button
          type="submit"
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70"
        >
          Next
          <FiChevronRight />
        </button>
      </div>
    </form>
  );
}