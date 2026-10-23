import { FiCode, FiPlus } from "react-icons/fi";

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "Tailwind CSS",
  "Git",
  "UI/UX Design",
  "Responsive Design",
];

export default function Skills() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-7 flex items-center gap-3">
        <FiCode className="text-[22px] text-violet-600" />

        <h2 className="text-[20px] font-extrabold text-slate-950">
          Skills
        </h2>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-xl bg-violet-50 px-4 py-2 text-[14px] font-semibold text-violet-600"
          >
            {skill}
          </span>
        ))}

        {/* Add Skill */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-600"
        >
          <FiPlus className="text-[16px]" />
          Add Skill
        </button>
      </div>

    </section>
  );
}