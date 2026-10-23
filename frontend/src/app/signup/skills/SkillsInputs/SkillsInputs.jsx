"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

const skillsList = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "UI/UX",
  "Figma",
  "SQL",
  "PostgreSQL",
  "Git",
];

export default function SkillsInputs() {
  const router = useRouter();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [agree, setAgree] = useState(false);

  const toggleSkill = (skill) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((item) => item !== skill);
      }

      return [...prevSkills, skill];
    });
  };

  const handleBack = () => {
    router.push("/signup/career");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      skills: selectedSkills,
      agreeTerms: agree,
    };

    console.log("Skills Form Data:", formData);

    // لاحقًا هون بنربط API create account
  };

  return (
  <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="mb-4 flex items-center gap-1 text-sm">
          <label className="font-bold text-slate-900">Your Skills</label>
          <span className="font-bold text-violet-600">*</span>
          <span className="text-slate-400">(select all that apply)</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {skillsList.map((skill) => {
            const isSelected = selectedSkills.includes(skill);

            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-200 ${
                  isSelected
                    ? "border-violet-500 bg-violet-50 text-violet-600 shadow-sm shadow-violet-100"
                    : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm font-medium text-slate-500">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-slate-300 accent-violet-600"
        />

        <span>
          I agree to the{" "}
          <a href="#" className="font-bold text-violet-600">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="font-bold text-violet-600">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-14 w-[105px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-500 transition hover:border-violet-300 hover:text-violet-600"
        >
          <FiChevronLeft className="text-lg" />
          Back
        </button>

        <button
          onClick={()=> router.push('/')}
          type="submit"
          className="h-14 flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70 transition hover:scale-[1.01]"
        >
          Create Account
        </button>
      </div>
    </form>
  </>
  );
}